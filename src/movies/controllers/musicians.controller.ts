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
import { MusiciansService } from './../services/musicians.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMusicianDto, UpdateMusicianDto } from '../dtos/musician.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Musicians')
@Controller('musicians')
export class MusiciansController {
  constructor(private musicianService: MusiciansService) {}

  @Roles(Role.ADMIN)
  @Get()
  showAllMusicians() {
    return this.musicianService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':musicianId')
  getAMusician(@Param('musicianId', ParseIntPipe) musicianId: number) {
    return this.musicianService.getOne(musicianId);
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() payload: CreateMusicianDto) {
    return this.musicianService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':musicianId/update')
  update(
    @Param('musicianId', ParseIntPipe) musicianId: number,
    @Body() payload: UpdateMusicianDto,
  ) {
    return this.musicianService.update(musicianId, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':musicianId')
  removeMusician(@Param('musicianId', ParseIntPipe) musicianId: number) {
    return this.musicianService.deleteMusician(musicianId);
  }
}
