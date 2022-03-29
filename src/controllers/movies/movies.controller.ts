import { Controller, Param, Get, Put, Body } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  showAllMovies() {
    //...
  }

  @Get(':movieId')
  showsMovie(@Param('movieId') movieId: number) {
    //...
  }

  @Put(':movieId/update')
  update(@Param('movieId') movieId: string, @Body() payload: any) {
    //...
  }
}
