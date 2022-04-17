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
import { DirectorsService } from './../services/directors.service';

import { ApiTags } from '@nestjs/swagger';
import { CreateDirectorDto, UpdateDirectorDto } from '../dtos/director.dto';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(RolesGuard)
@ApiTags('Directors')
@Controller('directors')
export class DirectorsController {
  constructor(private directorService: DirectorsService) {}

  @Get()
  @Roles(Role.ADMIN)
  showAllDirectors() {
    return this.directorService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':directorId')
  showADirector(@Param('directorId', ParseIntPipe) directorId: number) {
    return this.directorService.getOne(directorId);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateDirectorDto) {
    return this.directorService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':directorId/update')
  update(
    @Param('directorId', ParseIntPipe) directorId: number,
    @Body() payload: UpdateDirectorDto,
  ) {
    return this.directorService.update(directorId, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':directorId')
  removeMovie(@Param('directorId', ParseIntPipe) directorId: number) {
    return this.directorService.deleteDirector(directorId);
  }
}
