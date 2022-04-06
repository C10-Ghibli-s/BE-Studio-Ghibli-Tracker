import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTitleDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly originalTitle: string;

  @IsString()
  readonly romajiTitle: string;
}

export class UpdateTitleDto extends PartialType(CreateTitleDto) {}
