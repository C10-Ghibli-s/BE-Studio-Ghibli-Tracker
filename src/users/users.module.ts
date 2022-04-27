import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { InteractionsController } from './controllers/interactions.controller';
import { InteractionsService } from './services/interations.service';
import { Interaction } from './entities/interaction.entity';

import { MoviesModule } from './../movies/movies.module';
import { Movie } from 'src/movies/entities/movie.entity';

@Module({
  imports: [MoviesModule, TypeOrmModule.forFeature([User, Interaction, Movie])],
  controllers: [UsersController, InteractionsController],
  providers: [UsersService, InteractionsService],
  exports: [UsersService],
})
export class UsersModule {}
