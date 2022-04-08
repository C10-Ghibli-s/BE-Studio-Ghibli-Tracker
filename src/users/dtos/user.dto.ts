import {
  IsString,
  IsNumber,
  IsEmail,
  IsNotEmpty,
  Length,
  IsUrl,
} from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsUrl()
  readonly profilePicture?: string;

  @IsString()
  @IsNotEmpty()
  @Length(7)
  readonly password: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'It is the email of the user' })
  readonly email?: string;

  @IsString()
  @IsNotEmpty()
  readonly nickname: string;

  @IsString()
  readonly twitter?: string;

  @IsString()
  readonly facebook?: string;

  @IsNumber()
  readonly movieWatched: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
