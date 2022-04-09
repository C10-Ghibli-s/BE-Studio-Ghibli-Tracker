import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { ScoresController } from './controllers/scores.controller';
import { ScoresService } from './services/scores.service';
import { Score } from './entities/score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Score])],
  controllers: [UsersController, ScoresController],
  providers: [UsersService, ScoresService],
})
export class UsersModule {}
