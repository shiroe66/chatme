import { Public } from '@/common/decorators/metadata';
import { GetUser } from '@/common/decorators/request';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
  Res,
  Get,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body(ValidationPipe) registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return user;
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { id, email } = await this.authService.login(loginDto);
    const { access_token } = await this.authService.generateAccessToken(id, email);
    const { refresh_token, exp } = await this.authService.generateRefreshToken(id);

    response.setHeader('Authorization', `Bearer ${access_token}`);
    response.cookie('Refresh', refresh_token, {
      httpOnly: true,
      maxAge: exp * 1000,
    });
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async profile(@GetUser('email') email: string) {
    return this.authService.profile(email);
  }
}
