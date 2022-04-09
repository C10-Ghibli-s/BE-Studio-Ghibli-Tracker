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

import { ScoresService } from './../services/scores.service';
import { CreateScoreDto, UpdateScoreDto } from './../dtos/score.dto';

@ApiTags('Score')
@Controller('scores')
export class ScoresController {
  constructor(private scoreService: ScoresService) {}

  @Get()
  getAllScores() {
    return this.scoreService.findAll();
  }

  @Get(':scoresId')
  showAScore(@Param('scoresId', ParseIntPipe) scoresId: number) {
    return this.scoreService.getOne(scoresId);
  }

  @Post()
  create(@Body() payload: CreateScoreDto) {
    return this.scoreService.create(payload);
  }

  @Put(':scoreId/update')
  update(
    @Param('scoreId', ParseIntPipe) scoreId: number,
    @Body() payload: UpdateScoreDto,
  ) {
    return this.scoreService.update(scoreId, payload);
  }

  @Delete(':scoreId')
  removeScore(@Param('scoreId', ParseIntPipe) scoreId: number) {
    return this.scoreService.deleteScore(scoreId);
  }
}
