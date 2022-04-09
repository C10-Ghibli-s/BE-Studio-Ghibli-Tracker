import { IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
export class CreateWriterDto {
  @IsString()
  @ApiProperty()
  readonly name: string;
}

export class UpdateWriterDto extends PartialType(CreateWriterDto) {}
