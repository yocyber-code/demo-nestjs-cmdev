import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';

export const JwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return {
      secret: config.get('TOKEN_SECRET'),
      signOptions: {
        expiresIn: 5000,
      },
    };
  },
};
