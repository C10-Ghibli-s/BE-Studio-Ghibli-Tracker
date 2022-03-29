import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  showAllUsers() {
    //..
  }

  @Post('/signup')
  create(@Body() payload: any) {
    //..
  }

  @Get('/profile/:userId')
  showsMovie(@Param('userId') userId: number) {
    //...
  }

  @Put(':userId/update')
  update(@Param('userId') userId: string, @Body() payload: any) {
    //...
  }
}
