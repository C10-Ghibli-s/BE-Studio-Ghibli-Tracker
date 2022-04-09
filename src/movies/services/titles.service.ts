import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTitleDto, UpdateTitleDto } from './../dtos/title.dto';
import { Title } from './../entities/title.entity';

@Injectable()
export class TitlesService {
  constructor(@InjectRepository(Title) private titleRepo: Repository<Title>) {}

  findAll() {
    return this.titleRepo.find();
  }

  async getOne(id: number) {
    const title = await this.titleRepo.findOne(id);
    if (!title) {
      throw new NotFoundException(`The title with #${id} id is not found`);
    }
    return title;
  }

  create(data: CreateTitleDto) {
    const newTitle = this.titleRepo.create(data);
    return this.titleRepo.save(newTitle);
  }

  async update(id: number, data: UpdateTitleDto) {
    const title = await this.titleRepo.findOne(id);
    this.titleRepo.merge(title, data);
    return this.titleRepo.save(title);
  }

  deleteTitle(id: number) {
    return this.titleRepo.delete(id);
  }
}
