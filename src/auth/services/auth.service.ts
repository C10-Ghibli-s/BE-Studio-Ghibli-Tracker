import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './../../users/entities/user.entity';
import { PayloadToken } from './../models/token.model';
import { RequestResetPasswordDto } from '../dtos/request-reset-password.dto';
import { v4 } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async validateUser(nickname: string, password: string) {
    const user = await this.userService.findByNicname(nickname);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, createAt, updateAt, facebook, twitter, ...rta } =
          user;
        return rta;
      }
    }
    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async requestResetPassword(
    requestResetPasswordDto: RequestResetPasswordDto,
  ): Promise<void> {
    const { email } = requestResetPasswordDto;
    const user: User = await this.userService.findByEmail(email);
    user.resetPasswordToken = v4();
    this.userRepo.save(user);
  }

  async resetPasword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { resetPasswordToken, password } = resetPasswordDto;
    const user: User = await this.userService.findOneByresetPasswordToken(
      resetPasswordToken,
    );

    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.resetPasswordToken = null;
    this.userRepo.save(user);
  }

  async changePassword(changePasswordDto: ChangePasswordDto, user) {
    const { oldPassword, newPassword } = changePasswordDto;
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (isMatch) {
      const salt = await bcrypt.gentSalt();
      const hashPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashPassword;
      this.userRepo.save(user);
      return user;
    } else {
      throw new BadRequestException('Old password does not match');
    }
  }
}
