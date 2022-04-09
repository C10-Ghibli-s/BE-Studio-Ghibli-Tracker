import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies.service';
import { Movie } from './entities/movie.entity';
import { TitlesController } from './controllers/titles.controller';
import { TitlesService } from './services/titles.service';
import { Title } from './entities/title.entity';
import { WritersController } from './controllers/writers.controller';
import { WritersService } from './services/writers.service';
import { Writer } from './entities/writer.entity';
import { DirectorsController } from './controllers/directors.controller';
import { DirectorsService } from './services/directors.service';
import { Director } from './entities/director.entity';
import { MusiciansController } from './controllers/musicians.controller';
import { MusiciansService } from './services/musicians.service';
import { Musician } from './entities/musician.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, Title, Writer, Director, Musician]),
  ],
  controllers: [
    MoviesController,
    TitlesController,
    WritersController,
    DirectorsController,
    MusiciansController,
  ],
  providers: [
    MoviesService,
    MusiciansService,
    DirectorsService,
    WritersService,
    TitlesService,
  ],
  exports: [MoviesService],
})
export class MoviesModule {}
