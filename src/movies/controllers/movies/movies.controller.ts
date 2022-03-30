import { Body, Controller, Get, Param, Put } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  showAllMovies() {
    //--
  }

  @Get(':movieId')
  showAMovie(@Param('movieId') movieId: number) {
    //--
  }

  @Put(':movieId/update')
  update(@Param('movieId') movieId: string, @Body() payload: any) {
    //--
  }
}
