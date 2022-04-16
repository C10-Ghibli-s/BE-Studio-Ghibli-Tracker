import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsDecimal, IsPositive, IsOptional } from 'class-validator';

export class CreateScoreDto {
  @IsString()
  @ApiProperty()
  readonly scoreByEmoji: string;

  @IsDecimal()
  @ApiProperty()
  readonly scoreByStar: number;

  @IsDecimal()
  @ApiProperty()
  readonly audienceScore: number;

  @IsPositive()
  @ApiProperty()
  readonly movieId: number;
}

export class UpdateScoreDto extends PartialType(CreateScoreDto) {}
