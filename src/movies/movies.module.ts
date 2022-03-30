import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies/movies.controller';

@Module({
  controllers: [MoviesController],
})
export class MoviesModule {}
