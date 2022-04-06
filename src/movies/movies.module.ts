import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies.service';
import { TitlesController } from './controllers/titles.controller';
import { WritersController } from './controllers/writers.controller';
import { DirectorsController } from './controllers/directors.controller';
import { MusiciansController } from './controllers/musicians.controller';
import { MusiciansService } from './services/musicians.service';
import { DirectorsService } from './services/directors.service';
import { WritersService } from './services/writers.service';
import { TitlesService } from './services/titles.service';

@Module({
  controllers: [MoviesController, TitlesController, WritersController, DirectorsController, MusiciansController],
  providers: [MoviesService, MusiciansService, DirectorsService, WritersService, TitlesService],
})
export class MoviesModule {}
