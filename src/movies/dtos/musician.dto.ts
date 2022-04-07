import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateMusicianDto {
  @IsString()
  readonly name: string;
}

export class UpdateMusicianDto extends PartialType(CreateMusicianDto) {}
