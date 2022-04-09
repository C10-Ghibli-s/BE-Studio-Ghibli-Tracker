import { IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTitleDto {
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty()
  readonly originalTitle: string;

  @IsString()
  @ApiProperty()
  readonly romajiTitle: string;
}

export class UpdateTitleDto extends PartialType(CreateTitleDto) {}
