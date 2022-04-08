import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateDirectorDto {
  @IsString()
  readonly name: string;
}

export class UpdateDirectorDto extends PartialType(CreateDirectorDto) {}
