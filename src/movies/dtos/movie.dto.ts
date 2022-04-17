import {
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
  IsNotEmpty,
  IsArray,
  IsDecimal,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMovieDto {
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

  @IsDecimal()
  @ApiProperty()
  readonly audienceScore: number;

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
