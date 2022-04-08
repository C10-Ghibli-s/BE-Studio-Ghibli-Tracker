import { PartialType } from '@nestjs/swagger';
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
