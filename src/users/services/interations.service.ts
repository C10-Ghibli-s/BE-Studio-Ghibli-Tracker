import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateInteractionDto,
  UpdateInteractionDto,
} from '../dtos/interaction.dto';
import { Interaction } from '../entities/interaction.entity';
import { MoviesService } from '../../movies/services/movies.service';

@Injectable()
export class InteractionsService {
  constructor(
    @InjectRepository(Interaction)
    private interactionRepo: Repository<Interaction>,
    private moviesService: MoviesService,
  ) {}

  findAll() {
    return this.interactionRepo.find({
      relations: ['user'],
    });
  }

  async getOne(id: number) {
    const score = await this.interactionRepo.findOne(id);
    if (!score) {
      throw new NotFoundException(`The score with #${id} id is not found`);
    }
    return score;
  }

  async create(payload: CreateInteractionDto) {
    const newScore = this.interactionRepo.create(payload);
    if (payload.movieId) {
      const movie = await this.moviesService.getOne(payload.movieId);
      newScore.movie = movie;
    }
    return this.interactionRepo.save(newScore);
  }

  async update(id: number, payload: UpdateInteractionDto) {
    const score = await this.interactionRepo.findOne(id);
    this.interactionRepo.merge(score, payload);
    return this.interactionRepo.save(score);
  }

  deleteScore(id: number) {
    return this.interactionRepo.delete(id);
  }
}
