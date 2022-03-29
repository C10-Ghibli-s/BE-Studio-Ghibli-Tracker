import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users/users.controller';
import { MoviesController } from './controllers/movies/movies.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, MoviesController],
  providers: [AppService],
})
export class AppModule {}
