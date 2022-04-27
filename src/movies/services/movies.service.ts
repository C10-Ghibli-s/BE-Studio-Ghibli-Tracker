import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movie } from './../entities/movie.entity';
import { CreateMovieDto, UpdateMovieDto } from './../dtos/movie.dto';
import { Director } from '../entities/director.entity';
import { Writer } from '../entities/writer.entity';
import { Musician } from '../entities/musician.entity';
import { Title } from '../entities/title.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepo: Repository<Movie>,
    @InjectRepository(Title) private titleRepo: Repository<Title>,
    @InjectRepository(Director) private directorRepo: Repository<Director>,
    @InjectRepository(Musician) private musicianRepo: Repository<Musician>,
    @InjectRepository(Writer) private writerRepo: Repository<Writer>,
  ) {}

  findAll() {
    return this.movieRepo.find({
      relations: ['title'],
    });
  }

  async getOne(id: number) {
    const movie = await this.movieRepo.findOne(id, {
      relations: ['title', 'interactions', 'writers', 'directors', 'musicians'],
    });
    if (!movie) {
      throw new NotFoundException(`The mvie with #${id} id is not found`);
    }
    return movie;
  }

  async create(data: CreateMovieDto) {
    const newMovie = this.movieRepo.create(data);
    if (data.titleId) {
      const title = await this.titleRepo.findOne(data.titleId);
      newMovie.title = title;
    }
    if (data.directorsIds && data.musiciansIds && data.writersIds) {
      const directors = await this.directorRepo.findByIds(data.directorsIds);
      const writers = await this.writerRepo.findByIds(data.writersIds);
      const musicians = await this.musicianRepo.findByIds(data.musiciansIds);
      newMovie.directors = directors;
      newMovie.writers = writers;
      newMovie.musicians = musicians;
    }
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
