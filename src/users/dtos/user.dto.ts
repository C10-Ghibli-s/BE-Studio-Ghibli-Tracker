import {
  IsString,
  IsNumber,
  IsEmail,
  IsNotEmpty,
  Length,
  IsUrl,
  IsOptional,
} from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsUrl()
  @ApiProperty()
  @IsOptional()
  readonly profilePicture?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(7)
  readonly password: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiProperty({ description: 'It is the email of the user' })
  readonly email?: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  readonly nickname: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  readonly twitter?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  readonly facebook?: string;

  @IsNumber()
  @ApiProperty()
  readonly movieWatched: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
