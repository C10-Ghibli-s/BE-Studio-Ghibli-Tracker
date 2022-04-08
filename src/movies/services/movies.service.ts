import { Injectable } from '@nestjs/common';

import { Movie } from './../entities/movie.entity';
import { UpdateMovieDto } from './../dtos/movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [
    {
      id: 1,
      seenMark: 'check',
      linkWiki: 'dofahf',
      duration: 60,
      releaseDate: '01/02/2020',
    },
    {
      id: 2,
      seenMark: 'no-check',
      linkWiki: 'djfoqf',
      duration: 120,
      releaseDate: '01/12/2021',
    },
    {
      id: 3,
      seenMark: 'check',
      linkWiki: 'youtube-pazos',
      duration: 140,
      releaseDate: '25/05/2022',
    },
  ];

  findAll() {
    return this.movies;
  }

  getOne(id: number) {
    const movie = this.movies.find((item) => item.id === id);
    if (!movie) {
      throw new Error(`The mvie with #${id} id is not found`);
    }
    return movie;
  }

  update(id: number, changes: UpdateMovieDto) {
    const movie = this.getOne(id);
    const index = this.movies.findIndex((item) => item.id === id);
    this.movies[index] = {
      ...movie,
      ...changes,
    };
    return this.movies[index];
  }
}
