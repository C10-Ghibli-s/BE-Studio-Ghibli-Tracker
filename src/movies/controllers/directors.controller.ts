import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DirectorsService } from './../services/directors.service';

import { ApiTags } from '@nestjs/swagger';
import { CreateDirectorDto, UpdateDirectorDto } from '../dtos/director.dto';

@ApiTags('Directors')
@Controller('directors')
export class DirectorsController {
  constructor(private directorService: DirectorsService) {}

  @Get()
  showAllDirectors() {
    return this.directorService.findAll();
  }

  @Get(':directorId')
  showADirector(@Param('directorId', ParseIntPipe) directorId: number) {
    return this.directorService.getOne(directorId);
  }

  @Post()
  create(@Body() payload: CreateDirectorDto) {
    return this.directorService.create(payload);
  }

  @Put(':directorId/update')
  update(
    @Param('directorId', ParseIntPipe) directorId: number,
    @Body() payload: UpdateDirectorDto,
  ) {
    return this.directorService.update(directorId, payload);
  }

  @Delete(':directorId')
  removeMovie(@Param('directorId', ParseIntPipe) directorId: number) {
    return this.directorService.deleteDirector(directorId);
  }
}
