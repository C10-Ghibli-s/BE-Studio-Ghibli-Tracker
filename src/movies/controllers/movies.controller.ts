import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  ParseIntPipe,
  Post,
  Delete,
} from '@nestjs/common';

import { MoviesService } from './../services/movies.service';
import { CreateMovieDto, UpdateMovieDto } from './../dtos/movie.dto';
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

  @Post()
  create(@Body() payload: CreateMovieDto) {
    return this.moviesService.create(payload);
  }

  @Put(':movieId/update')
  update(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Body() payload: UpdateMovieDto,
  ) {
    return this.moviesService.update(movieId, payload);
  }

  @Delete(':movieId')
  removeMovie(@Param('movieId', ParseIntPipe) movieId: number) {
    return this.moviesService.deleteMovie(movieId);
  }
}
