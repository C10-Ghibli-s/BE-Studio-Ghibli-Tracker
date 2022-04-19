import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './../services/users.service';
import { CreateUserDto, UpdateUserDto } from './../dtos/user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../../auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'All the users in a list.' })
  showAllUsers() {
    return this.usersService.findAll();
  }

  @Get('profile/:userId')
  @Roles(Role.ADMIN, Role.USER)
  showAUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.getProfile(userId);
  }

  @Public()
  @Post('signup')
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put('profile/:userId/update')
  @Roles(Role.ADMIN, Role.USER)
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(userId, payload);
  }

  @Delete(':userId')
  @Roles(Role.ADMIN)
  removeUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.deleteUser(userId);
  }
}
