import { Module } from '@nestjs/common';
import { AuthenController } from './authen.controller';
import { AuthenService } from './authen.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthJwtStrategy } from './authen.jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(JwtConfig),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthenController],
  providers: [AuthenService, UserRepository, AuthJwtStrategy],
  exports: [AuthJwtStrategy, PassportModule],
})
export class AuthenModule {}
