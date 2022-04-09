import { IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMusicianDto {
  @IsString()
  @ApiProperty()
  readonly name: string;
}

export class UpdateMusicianDto extends PartialType(CreateMusicianDto) {}
