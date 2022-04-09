import { IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateDirectorDto {
  @ApiProperty()
  @IsString()
  readonly name: string;
}

export class UpdateDirectorDto extends PartialType(CreateDirectorDto) {}
