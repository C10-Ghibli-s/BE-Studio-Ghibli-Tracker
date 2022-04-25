import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateWriterDto, UpdateWriterDto } from './../dtos/writer.dto';
import { Writer } from './../entities/writer.entity';
@Injectable()
export class WritersService {
  constructor(
    @InjectRepository(Writer) private writerRepo: Repository<Writer>,
  ) {}

  findAll() {
    return this.writerRepo.find();
  }

  async getOne(id: number) {
    const writer = await this.writerRepo.findOne(id);
    if (!writer) {
      throw new NotFoundException(`Writer with #${id} id does not exist.`);
    }
    return writer;
  }

  create(data: CreateWriterDto) {
    const newWriter = this.writerRepo.create(data);
    return this.writerRepo.save(newWriter);
  }

  async update(id: number, data: UpdateWriterDto) {
    const writer = await this.writerRepo.findOne(id);
    this.writerRepo.merge(writer, data);
    return this.writerRepo.save(writer);
  }

  deleteWriter(id: number) {
    return this.writerRepo.delete(id);
  }
}
