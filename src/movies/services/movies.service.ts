import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movie } from './../entities/movie.entity';
import { CreateMovieDto, UpdateMovieDto } from './../dtos/movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private movieRepo: Repository<Movie>) {}

  findAll() {
    return this.movieRepo.find();
  }

  async getOne(id: number) {
    const movie = await this.movieRepo.findOne(id);
    if (!movie) {
      throw new NotFoundException(`The mvie with #${id} id is not found`);
    }
    return movie;
  }

  create(data: CreateMovieDto) {
    const newMovie = this.movieRepo.create(data);
    return this.movieRepo.save(newMovie);
  }

  async update(id: number, data: UpdateMovieDto) {
    const movie = await this.movieRepo.findOne(id);
    this.movieRepo.merge(movie, data);
    return this.movieRepo.save(movie);
  }

  deleteMovie(id: number) {
    return this.movieRepo.delete(id);
  }
}
