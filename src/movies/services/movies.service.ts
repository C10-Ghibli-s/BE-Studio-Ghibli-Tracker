import { Injectable } from '@nestjs/common';

import { Movie } from './../entities/movie.entity';

@Injectable()
export class MoviesService {
  private counterId = 1;
  private movies: Movie[] = [
    {
      id: 1,
      seenMark: 'check',
      linkWiki: 'dofahf',
      duration: 60,
      releaseDate: '01/02/2020',
      title: { id: 1, originalTitle: 'holamuncho', romajiTitle: 'djoafj' },
      writers: { id: 1, name: 'pepitoalcantara' },
      directors: { id: 1, name: 'yosiquitofokito' },
      mucisians: { id: 1, name: 'wuenas' },
      score: {
        id: 1,
        audienceScore: 5,
        scoreByEmoji: 'smile',
        scoreByStars: 3.4,
      },
    },
    {
      id: 2,
      seenMark: 'no-check',
      linkWiki: 'djfoqf',
      duration: 120,
      releaseDate: '01/12/2021',
      title: { id: 2, originalTitle: 'quetal', romajiTitle: 'djoet2j' },
      writers: { id: 2, name: 'pepitoalckera' },
      directors: { id: 2, name: 'modular' },
      mucisians: { id: 2, name: 'wujejeas' },
      score: {
        id: 2,
        audienceScore: 4,
        scoreByEmoji: 'sad',
        scoreByStars: 2.1,
      },
    },
    {
      id: 3,
      seenMark: 'check',
      linkWiki: 'youtube-pazos',
      duration: 140,
      releaseDate: '25/05/2022',
      title: { id: 3, originalTitle: 'jeejfe', romajiTitle: 'wueno' },
      writers: { id: 3, name: 'pipeModular' },
      directors: { id: 3, name: 'classsiporfavor' },
      mucisians: { id: 3, name: 'aguitaparamigente' },
      score: {
        id: 3,
        audienceScore: 3.6,
        scoreByEmoji: 'Excellent',
        scoreByStars: 4.2,
      },
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

  update(id: number, changes: any) {
    const movie = this.getOne(id);
    const index = this.movies.findIndex((item) => item.id === id);
    this.movies[index] = {
      ...movie,
      ...changes,
    };
    return this.movies[index];
  }
}
