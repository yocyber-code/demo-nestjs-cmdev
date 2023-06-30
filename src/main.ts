import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { loggerFn } from './middleware/logger.fn.middleware';
import { ConfigService } from '@nestjs/config';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  const configService = new ConfigService();

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
    const swagerConfig = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cats')
      .build();
    const document = SwaggerModule.createDocument(app, swagerConfig);
    SwaggerModule.setup('swagger', app, document);
  } else {
    app.enableCors();
    // app.enableCors({ origin: configService.get<string>('ORIGIN') });
    // console.log('serverConfig.origin', configService.get<string>('ORIGIN'));
    console.log(serverConfig.port);

    console.log(
      configService.get<string>('DB_HOST'),
      configService.get<number>('DB_PORT'),
      configService.get<string>('DB_USERNAME'),
      configService.get<string>('DB_PASSWORD'),
      configService.get<string>('DB_NAME'),
    );
  }

  // app.use(loggerFn)
  await app.listen(process.env.PORT || serverConfig.port);
}
bootstrap();
