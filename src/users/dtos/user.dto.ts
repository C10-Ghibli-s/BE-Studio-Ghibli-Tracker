import {
  IsString,
  IsNumber,
  IsEmail,
  IsNotEmpty,
  Length,
  IsUrl,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

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
