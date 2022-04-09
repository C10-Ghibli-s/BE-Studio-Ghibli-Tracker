import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateScoreDto, UpdateScoreDto } from './../dtos/score.dto';
import { Score } from './../entities/score.entity';

@Injectable()
export class ScoresService {
  constructor(@InjectRepository(Score) private scoreRepo: Repository<Score>) {}

  findAll() {
    return this.scoreRepo.find();
  }

  async getOne(id: number) {
    const score = await this.scoreRepo.findOne(id);
    if (!score) {
      throw new NotFoundException(`The score with #${id} id is not found`);
    }
    return score;
  }

  create(data: CreateScoreDto) {
    const newScore = this.scoreRepo.create(data);
    return this.scoreRepo.save(newScore);
  }

  async update(id: number, data: UpdateScoreDto) {
    const score = await this.scoreRepo.findOne(id);
    this.scoreRepo.merge(score, data);
    return this.scoreRepo.save(score);
  }

  deleteScore(id: number) {
    return this.scoreRepo.delete(id);
  }
}
