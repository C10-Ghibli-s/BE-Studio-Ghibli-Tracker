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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { InteractionsService } from '../services/interations.service';
import {
  CreateInteractionDto,
  UpdateInteractionDto,
} from '../dtos/interaction.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Interaction')
@Controller('interactions')
export class InteractionsController {
  constructor(private iteractionService: InteractionsService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Shows all interactions atributte with Users information.',
  })
  getAllInteractions() {
    return this.iteractionService.findAll();
  }

  @Get(':interactionsId')
  @ApiOperation({
    summary: 'Shows an interaction atributte with movies information.',
  })
  showAScore(@Param('interactionsId', ParseIntPipe) interactionsId: number) {
    return this.iteractionService.getOne(interactionsId);
  }

  @Get('filter/:userId')
  @ApiOperation({
    summary: 'Shows all the interactions by User Id related with movies.',
  })
  @Roles(Role.ADMIN, Role.USER)
  movieFilter(@Param('userId', ParseIntPipe) userId: number) {
    return this.iteractionService.filter(userId);
  }

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  create(@Body() payload: CreateInteractionDto) {
    return this.iteractionService.create(payload);
  }

  @Put(':interactionsId/update')
  @Roles(Role.ADMIN, Role.USER)
  update(
    @Param('interactionsId', ParseIntPipe) interactionsId: number,
    @Body() payload: UpdateInteractionDto,
  ) {
    return this.iteractionService.update(interactionsId, payload);
  }

  @Delete(':interactionsId')
  @Roles(Role.ADMIN)
  removeScore(@Param('interactionsId', ParseIntPipe) interactionsId: number) {
    return this.iteractionService.deleteScore(interactionsId);
  }
}
