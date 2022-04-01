import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  ParseIntPipe,
} from '@nestjs/common';

import { MoviesService } from './../services/movies.service';

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
  update(@Param('movieId') movieId: string, @Body() payload: any) {
    return this.moviesService.update(+movieId, payload);
  }
}
