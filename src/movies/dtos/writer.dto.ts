import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateWriterDto {
  @IsString()
  readonly name: string;
}

export class UpdateWriterDto extends PartialType(CreateWriterDto) {}
