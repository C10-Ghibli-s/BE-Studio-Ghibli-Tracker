import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './../dtos/user.dto';
import { Client } from 'pg';
import { ScoresService } from './scores.service';
import { MoviesService } from './../../movies/services/movies.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
    private scoreService: ScoresService,
    private moviesService: MoviesService,
  ) {}

  findAll() {
    return this.userRepo.find({
      relations: ['movie'],
    });
  }

  async getProfile(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with #${id} id not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    if (data.scoreId) {
      const score = await this.scoreService.getOne(data.scoreId);
      newUser.score = score;
    }
    if (data.movieId) {
      const movie = await this.moviesService.getOne(data.movieId);
      newUser.movie = movie;
    }
    const user = this.userRepo
      .save(newUser)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(`${err.message || 'Unexpected Error'}`);
      });
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.userRepo.findOne(id);
    this.userRepo.merge(user, data);
    return this.userRepo.save(user);
  }

  deleteUser(id: number) {
    return this.userRepo.delete(id);
  }
}
