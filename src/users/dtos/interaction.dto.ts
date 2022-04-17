import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsDecimal, IsPositive, IsBoolean } from 'class-validator';

export class CreateInteractionDto {
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

  @IsBoolean()
  @ApiProperty()
  readonly seenMark: boolean;
}

export class UpdateInteractionDto extends PartialType(CreateInteractionDto) {}
