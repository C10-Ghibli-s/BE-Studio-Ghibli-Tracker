import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDirectorDto {
  @IsString()
  readonly name: string;
}

export class UpdateDirectorDto extends PartialType(CreateDirectorDto) {}
