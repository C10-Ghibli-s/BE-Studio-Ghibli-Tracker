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
import { ApiTags } from '@nestjs/swagger';
import { CreateWriterDto, UpdateWriterDto } from '../dtos/writer.dto';

import { WritersService } from './../services/writers.service';
@ApiTags('Writers')
@Controller('writers')
export class WritersController {
  constructor(private writersService: WritersService) {}

  @Get()
  showAllWriters() {
    return this.writersService.findAll();
  }

  @Get(':writerId')
  getAWriter(@Param('writerId', ParseIntPipe) writerId: number) {
    return this.writersService.getOne(writerId);
  }

  @Post()
  create(@Body() payload: CreateWriterDto) {
    return this.writersService.create(payload);
  }

  @Put(':writerId/update')
  update(
    @Param('writerId', ParseIntPipe) writerId: number,
    @Body() payload: UpdateWriterDto,
  ) {
    return this.writersService.update(writerId, payload);
  }

  @Delete(':writerId')
  removeWriter(@Param('writerId', ParseIntPipe) writerId: number) {
    return this.writersService.deleteWriter(writerId);
  }
}
