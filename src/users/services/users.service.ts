import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './../dtos/user.dto';
import { Client } from 'pg';

@Injectable()
export class UsersService {
  constructor(
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  async getProfile(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with #${id} id not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    return this.userRepo.save(newUser);
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
