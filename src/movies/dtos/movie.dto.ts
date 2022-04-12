import {
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
  IsNotEmpty,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMovieDto {
  @IsBoolean()
  @ApiProperty()
  readonly seenMark: boolean;

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

  @IsPositive()
  @ApiProperty()
  readonly titleId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly directorsIds: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly writersIds: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly musiciansIds: number[];
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
