import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  ParseIntPipe,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { MoviesService } from './../services/movies.service';
import { CreateMovieDto, UpdateMovieDto } from './../dtos/movie.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  @Roles(Role.ADMIN)
  showAllMovies() {
    return this.moviesService.findAll();
  }

  @Get(':movieId')
  showAMovie(@Param('movieId', ParseIntPipe) movieId: number) {
    return this.moviesService.getOne(movieId);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateMovieDto) {
    return this.moviesService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':movieId/update')
  update(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Body() payload: UpdateMovieDto,
  ) {
    return this.moviesService.update(movieId, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':movieId')
  removeMovie(@Param('movieId', ParseIntPipe) movieId: number) {
    return this.moviesService.deleteMovie(movieId);
  }
}
