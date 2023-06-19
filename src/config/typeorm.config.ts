import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1324',
    database: 'cmstock',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}