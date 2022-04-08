import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  ParseIntPipe,
} from '@nestjs/common';

import { MoviesService } from './../services/movies.service';
import { UpdateMovieDto } from './../dtos/movie.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  showAllMovies() {
    return this.moviesService.findAll();
  }

  @Get(':movieId')
  showAMovie(@Param('movieId', ParseIntPipe) movieId: number) {
    return this.moviesService.getOne(movieId);
  }

  @Put(':movieId/update')
  update(@Param('movieId') movieId: string, @Body() payload: UpdateMovieDto) {
    return this.moviesService.update(+movieId, payload);
  }
}
