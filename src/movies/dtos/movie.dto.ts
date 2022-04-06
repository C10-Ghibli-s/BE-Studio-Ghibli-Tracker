import { IsString, IsNumber, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateMovieDto {
  @IsString()
  readonly seenMark: string;

  @IsString()
  @IsUrl()
  readonly linkWiki: string;

  @IsNumber()
  readonly duration: number;

  @IsString()
  readonly releaseDate: string;
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
