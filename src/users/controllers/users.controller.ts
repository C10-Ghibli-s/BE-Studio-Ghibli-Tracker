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
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { Public } from '../../auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'All the users in a list.' })
  showAllUsers() {
    return this.usersService.findAll();
  }

  @Get('profile/:userId')
  showAUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.getProfile(userId);
  }

  @Public()
  @Post('signup')
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put('profile/:userId/update')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(userId, payload);
  }

  @Delete(':userId')
  removeUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.deleteUser(userId);
  }
}
