import { Controller, Get } from '@nestjs/common';
import { DirectorsService } from './../services/directors.service';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Directors')
@Controller('directors')
export class DirectorsController {
  constructor(private directorService: DirectorsService) {}

  @Get()
  showAllDirectors() {
    return this.directorService.findAll();
  }
}
