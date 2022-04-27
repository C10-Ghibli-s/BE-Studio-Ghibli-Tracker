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

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly movieBanner: string;

  @IsPositive()
  @ApiProperty()
  readonly titleId: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly description: string;

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
