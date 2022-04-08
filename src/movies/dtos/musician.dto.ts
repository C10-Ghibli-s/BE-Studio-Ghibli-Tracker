import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateMusicianDto {
  @IsString()
  readonly name: string;
}

export class UpdateMusicianDto extends PartialType(CreateMusicianDto) {}
