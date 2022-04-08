import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateWriterDto {
  @IsString()
  readonly name: string;
}

export class UpdateWriterDto extends PartialType(CreateWriterDto) {}
