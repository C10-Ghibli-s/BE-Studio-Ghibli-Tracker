import { Injectable } from '@nestjs/common';
import { CreateDirectorDto, UpdateDirectorDto } from './../dtos/director.dto';

import { Director } from './../entities/director.entity';
@Injectable()
export class DirectorsService {
  private directors: Director[] = [
    {
      id: 1,
      name: 'Juan Peralta',
    },
    {
      id: 2,
      name: 'Valentina Serrano',
    },
  ];

  findAll() {
    return this.directors;
  }
}
