import { IsString, IsNumber, IsUrl } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMovieDto {
  @IsString()
  @ApiProperty()
  readonly seenMark: string;

  @IsString()
  @IsUrl()
  @ApiProperty()
  readonly linkWiki: string;

  @IsNumber()
  @ApiProperty()
  readonly duration: number;

  @IsString()
  @ApiProperty()
  readonly releaseDate: string;
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
