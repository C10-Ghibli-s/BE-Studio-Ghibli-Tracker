import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDirectorDto, UpdateDirectorDto } from './../dtos/director.dto';
import { Director } from './../entities/director.entity';
@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Director) private directorRepo: Repository<Director>,
  ) {}

  findAll() {
    return this.directorRepo.find();
  }

  async getOne(id: number) {
    const director = await this.directorRepo.findOne(id);
    if (!director) {
      throw new NotFoundException(`Director with #${id} id is not registered.`);
    }
    return director;
  }

  create(data: CreateDirectorDto) {
    const newDirector = this.directorRepo.create(data);
    return this.directorRepo.save(newDirector);
  }

  async update(id: number, data: UpdateDirectorDto) {
    const director = await this.directorRepo.findOne(id);
    this.directorRepo.merge(director, data);
    return this.directorRepo.save(director);
  }

  deleteDirector(id: number) {
    return this.directorRepo.delete(id);
  }
}
