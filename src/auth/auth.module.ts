import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { TwitterStrategy } from './strategies/twitter.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UsersModule } from './../users/users.module';
import { AuthController } from './controllers/auth.controller';
import config from './../configs/config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { RefreshToken } from './strategies/refreshToken.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '5m',
          },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    FacebookStrategy,
    TwitterStrategy,
    JwtStrategy,
    RefreshToken,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
