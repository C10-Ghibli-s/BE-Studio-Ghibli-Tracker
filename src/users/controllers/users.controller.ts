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

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  showAllUsers() {
    return this.usersService.findAll();
  }

  @Post('signup')
  create(@Body() payload: any) {
    return this.usersService.create(payload);
  }

  @Get('profile/:userId')
  showAUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.getProfile(userId);
  }

  @Put('profile/:userId/update')
  update(@Param('userId') userId: string, @Body() payload: any) {
    return this.usersService.update(+userId, payload);
  }
}
