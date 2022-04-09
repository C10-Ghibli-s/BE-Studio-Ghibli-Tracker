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
import { MusiciansService } from './../services/musicians.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMusicianDto, UpdateMusicianDto } from '../dtos/musician.dto';

@ApiTags('Musicians')
@Controller('musicians')
export class MusiciansController {
  constructor(private musicianService: MusiciansService) {}

  @Get()
  showAllMusicians() {
    return this.musicianService.findAll();
  }

  @Get(':musicianId')
  getAMusician(@Param('musicianId', ParseIntPipe) musicianId: number) {
    return this.musicianService.getOne(musicianId);
  }

  @Get(':movieId')
  showAMovie(@Param('movieId', ParseIntPipe) movieId: number) {
    return this.musicianService.getOne(movieId);
  }

  @Post()
  create(@Body() payload: CreateMusicianDto) {
    return this.musicianService.create(payload);
  }

  @Put(':musicianId/update')
  update(
    @Param('musicianId', ParseIntPipe) musicianId: number,
    @Body() payload: UpdateMusicianDto,
  ) {
    return this.musicianService.update(musicianId, payload);
  }

  @Delete(':musicianId')
  removeMusician(@Param('musicianId', ParseIntPipe) musicianId: number) {
    return this.musicianService.deleteMusician(musicianId);
  }
}
