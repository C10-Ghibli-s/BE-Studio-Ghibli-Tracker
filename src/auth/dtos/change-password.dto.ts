import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @Length(7)
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(7)
  newPassword: string;
}
