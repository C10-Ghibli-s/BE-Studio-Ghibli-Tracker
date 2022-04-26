import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './../dtos/user.dto';
import { Client } from 'pg';
import { Interaction } from '../entities/interaction.entity';
import { Movie } from 'src/movies/entities/movie.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Interaction)
    private interactionRepo: Repository<Interaction>,
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
  ) {}

  findAll() {
    return this.userRepo.find({
      relations: ['movie'],
    });
  }

  async getProfile(id: number) {
    const user = await this.userRepo.findOne(id, {
      relations: ['interactions'],
    });
    if (!user) {
      throw new NotFoundException(`User with #${id} id not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    if (data.movieId) {
      const movie = await this.movieRepo.findOne(data.movieId);
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

  findByNicname(nickname: string) {
    return this.userRepo.findOne({ where: { nickname } });
  }

  async findByEmail(email: string) {
    const user: User = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findOneByresetPasswordToken(resetPasswordToken: string): Promise<User> {
    const user: User = await this.userRepo.findOne({ resetPasswordToken });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async addInterationToUser(
    userId: number,
    movieId: number,
    interactionId: number,
  ) {
    const user = await this.userRepo.findOne(userId, {
      relations: ['interactions'],
    });
    const interaction = await this.interactionRepo.findOne(interactionId);
    user.interactions.push(interaction);
    const movie = await this.movieRepo.findOne(movieId);
    user.movie = movie;
    return this.userRepo.save(user);
  }
}
/* if (data.interactionIds && data.movieId) {
      const interactions = await this.interactionRepo.findByIds(
        data.interactionIds,
      );
      const movie = await this.movieRepo.findOne(data.movieId);
      user.interactions = interactions;
      user.movie = movie;
    } */
