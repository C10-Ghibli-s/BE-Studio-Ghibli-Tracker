import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsDecimal } from 'class-validator';

export class CreateScoreDto {
  @IsString()
  readonly scoreByEmoji: string;

  @IsDecimal()
  readonly scoreByStars: number;

  @IsDecimal()
  readonly audienceScore: number;
}

export class UpdateScoreDto extends PartialType(CreateScoreDto) {}
