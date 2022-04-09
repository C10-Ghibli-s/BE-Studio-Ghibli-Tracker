import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments';
import config from './configs/config';
import configShema from './configs/configShema';

@Module({
  imports: [
    UsersModule,
    MoviesModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configShema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
