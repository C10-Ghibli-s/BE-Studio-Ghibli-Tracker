import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';

import { UsersService } from './../services/users.service';
import { CreateUserDto, UpdateUserDto } from './../dtos/user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'All the users in a list.' })
  showAllUsers() {
    return this.usersService.findAll();
  }

  @Post('signup')
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Get('profile/:userId')
  showAUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.getProfile(userId);
  }

  @Put('profile/:userId/update')
  update(@Param('userId') userId: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(+userId, payload);
  }
}
