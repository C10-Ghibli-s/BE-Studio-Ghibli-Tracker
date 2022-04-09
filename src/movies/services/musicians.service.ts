import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Musician } from './../entities/musician.entity';
import { CreateMusicianDto, UpdateMusicianDto } from './../dtos/musician.dto';

@Injectable()
export class MusiciansService {
  constructor(
    @InjectRepository(Musician) private musicianRepo: Repository<Musician>,
  ) {}

  findAll() {
    return this.musicianRepo.find();
  }

  async getOne(id: number) {
    const musician = await this.musicianRepo.findOne(id);
    if (!musician) {
      throw new NotFoundException(`Musician with #${id} id does not exist`);
    }
    return musician;
  }

  create(data: CreateMusicianDto) {
    const newMusician = this.musicianRepo.create(data);
    return this.musicianRepo.save(newMusician);
  }

  async update(id: number, data: UpdateMusicianDto) {
    const musician = await this.musicianRepo.findOne(id);
    this.musicianRepo.merge(musician, data);
    return this.musicianRepo.save(musician);
  }

  deleteMusician(id: number) {
    return this.musicianRepo.delete(id);
  }
}
