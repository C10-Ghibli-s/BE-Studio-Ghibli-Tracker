import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsDecimal } from 'class-validator';

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
}

export class UpdateScoreDto extends PartialType(CreateScoreDto) {}
