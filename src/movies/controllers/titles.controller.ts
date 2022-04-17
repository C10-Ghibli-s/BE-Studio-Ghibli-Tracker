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
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/roles.model';
import { CreateTitleDto, UpdateTitleDto } from '../dtos/title.dto';

import { TitlesService } from './../services/titles.service';

@UseGuards(RolesGuard)
@ApiTags('Titles')
@Controller('titles')
export class TitlesController {
  constructor(private titlesService: TitlesService) {}

  @Get()
  @Roles(Role.ADMIN)
  showAllTitles() {
    return this.titlesService.findAll();
  }

  @Get(':titleId')
  @Roles(Role.ADMIN)
  getATitle(@Param('titleId', ParseIntPipe) titleId: number) {
    return this.titlesService.getOne(titleId);
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() payload: CreateTitleDto) {
    return this.titlesService.create(payload);
  }

  @Put(':titleId/update')
  @Roles(Role.ADMIN)
  update(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Body() payload: UpdateTitleDto,
  ) {
    return this.titlesService.update(titleId, payload);
  }

  @Delete(':titleId')
  @Roles(Role.ADMIN)
  removeTitle(@Param('titleId', ParseIntPipe) titleId: number) {
    return this.titlesService.deleteTitle(titleId);
  }
}
