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

import { ScoresService } from './../services/scores.service';
import { CreateScoreDto, UpdateScoreDto } from './../dtos/score.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Score')
@Controller('scores')
export class ScoresController {
  constructor(private scoreService: ScoresService) {}

  @Get()
  @Roles(Role.ADMIN)
  getAllScores() {
    return this.scoreService.findAll();
  }

  @Get(':scoresId')
  showAScore(@Param('scoresId', ParseIntPipe) scoresId: number) {
    return this.scoreService.getOne(scoresId);
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() payload: CreateScoreDto) {
    return this.scoreService.create(payload);
  }

  @Put(':scoreId/update')
  @Roles(Role.ADMIN, Role.USER)
  update(
    @Param('scoreId', ParseIntPipe) scoreId: number,
    @Body() payload: UpdateScoreDto,
  ) {
    return this.scoreService.update(scoreId, payload);
  }

  @Delete(':scoreId')
  @Roles(Role.ADMIN)
  removeScore(@Param('scoreId', ParseIntPipe) scoreId: number) {
    return this.scoreService.deleteScore(scoreId);
  }
}
