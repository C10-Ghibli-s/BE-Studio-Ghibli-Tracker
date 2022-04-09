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
import { CreateTitleDto, UpdateTitleDto } from '../dtos/title.dto';

import { TitlesService } from './../services/titles.service';

@ApiTags('Titles')
@Controller('titles')
export class TitlesController {
  constructor(private titlesService: TitlesService) {}

  @Get()
  showAllTitles() {
    return this.titlesService.findAll();
  }

  @Get(':titleId')
  getATitle(@Param('titleId', ParseIntPipe) titleId: number) {
    return this.titlesService.getOne(titleId);
  }

  @Post()
  create(@Body() payload: CreateTitleDto) {
    return this.titlesService.create(payload);
  }

  @Put(':titleId/update')
  update(
    @Param('titleId', ParseIntPipe) titleId: number,
    @Body() payload: UpdateTitleDto,
  ) {
    return this.titlesService.update(titleId, payload);
  }

  @Delete(':titleId')
  removeTitle(@Param('titleId', ParseIntPipe) titleId: number) {
    return this.titlesService.deleteTitle(titleId);
  }
}
