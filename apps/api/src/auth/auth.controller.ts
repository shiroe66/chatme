import { Public } from '@/common/decorators/metadata';
import { GetToken, GetUser } from '@/common/decorators/request';
import { RefreshGuard } from '@/common/guards';
import { SessionsService } from '@/models/session/session.service';
import { User } from '@/models/user/entities/user.entity';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
  Res,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    private sessionService: SessionsService,
  ) {}

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
    const user = await this.authService.login(loginDto);

    // FIX: access token expiration
    const { access_token } = await this.authService.generateAccessToken(
      user.id,
      user.email,
    );
    const { refresh_token, exp } = await this.authService.generateRefreshToken(user.id);

    response.setHeader('Authorization', `Bearer ${access_token}`);
    response.cookie('refresh', refresh_token, {
      httpOnly: true,
      maxAge: exp * 1000,
    });

    this.sessionService.create({ token: refresh_token, expires: exp, user });
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async profile(@GetUser('email') email: string) {
    return this.authService.profile(email);
  }

  @Get('refresh')
  @UseGuards(RefreshGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetUser() user: User,
    @GetToken('refresh') token: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { exp } = await this.authService.decode(token);
    const expirationTimestamp = (exp - 60) * 1000;
    const currentTimestamp = new Date().getTime();

    const { access_token } = await this.authService.generateAccessToken(
      user.id,
      user.email,
    );
    response.setHeader('Authorization', `Bearer ${access_token}`);

    if (currentTimestamp >= expirationTimestamp) {
      const { refresh_token, exp } = await this.authService.generateRefreshToken(user.id);
      response.cookie('refresh', refresh_token, {
        httpOnly: true,
        maxAge: exp * 1000,
      });
    }
  }
}
