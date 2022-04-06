import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ScoresController } from './controllers/scores.controller';
import { ScoresService } from './services/scores.service';

@Module({
  controllers: [UsersController, ScoresController],
  providers: [UsersService, ScoresService],
})
export class UsersModule {}
