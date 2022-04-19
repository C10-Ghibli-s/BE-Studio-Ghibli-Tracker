import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './../services/auth.service';
import { User } from './../../users/entities/user.entity';
import { RequestResetPasswordDto } from '../dtos/request-reset-password.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../models/roles.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { GetUser } from '../decorators/get-user.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Authentications')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Public()
  @Post('login/email')
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }

  @Public()
  @Get('login/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Public()
  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  @Public()
  @Get('login/twitter')
  @UseGuards(AuthGuard('twitter'))
  async twitterLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Public()
  @Get('twitter/redirect')
  @UseGuards(AuthGuard('twitter'))
  async twitterLoginRedirect(@Req() req: Request): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  @Public()
  @Patch('request-reset-password')
  requestResetPassword(
    @Body() requestResetPasswordDto: RequestResetPasswordDto,
  ): Promise<void> {
    return this.authService.requestResetPassword(requestResetPasswordDto);
  }

  @Public()
  @Patch('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
    return this.authService.resetPasword(resetPasswordDto);
  }

  @Patch('change-password')
  @UseGuards(AuthGuard('jwt'))
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: User,
  ) {
    return this.authService.changePassword(changePasswordDto, user);
  }

  @Post('logout')
  logout() {
    this.authService.logout();
  }

  @Post('refresh')
  refreshToken() {
    this.authService.refreshToken();
  }
}
