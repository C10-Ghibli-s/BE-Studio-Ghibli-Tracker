import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/roles.model';
import { CreateWriterDto, UpdateWriterDto } from '../dtos/writer.dto';

import { WritersService } from './../services/writers.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Writers')
@Controller('writers')
export class WritersController {
  constructor(private writersService: WritersService) {}

  @Get()
  @Roles(Role.ADMIN)
  showAllWriters() {
    return this.writersService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':writerId')
  getAWriter(@Param('writerId', ParseIntPipe) writerId: number) {
    return this.writersService.getOne(writerId);
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() payload: CreateWriterDto) {
    return this.writersService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':writerId/update')
  update(
    @Param('writerId', ParseIntPipe) writerId: number,
    @Body() payload: UpdateWriterDto,
  ) {
    return this.writersService.update(writerId, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':writerId')
  removeWriter(@Param('writerId', ParseIntPipe) writerId: number) {
    return this.writersService.deleteWriter(writerId);
  }
}
