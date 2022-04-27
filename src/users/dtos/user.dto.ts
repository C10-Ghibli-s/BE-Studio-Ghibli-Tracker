import {
  IsString,
  IsNumber,
  IsEmail,
  IsNotEmpty,
  Length,
  IsUrl,
  IsOptional,
  IsPositive,
  IsArray,
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
  @IsOptional()
  @ApiProperty()
  readonly movieWatched: number;

  @IsArray()
  @ApiProperty()
  @IsOptional()
  readonly interactionIds: number[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly role: string;

  @IsPositive()
  @ApiProperty()
  @IsOptional()
  readonly movieId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
