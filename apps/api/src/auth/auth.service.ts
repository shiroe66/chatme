import argon2 from 'argon2';
import { VerificationService } from '@/mails/verification.service';
import { User } from '@/models/user/entities/user.entity';
import { UserService } from '@/models/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtConfigService } from '@/config/jwt/config.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@/common/interfaces';
import { parseExpireTime } from '@/common/helpers';

@Injectable()
export class AuthService {
  constructor(
    private verificationService: VerificationService,
    private userService: UserService,
    private jwtConfigService: JwtConfigService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const password = await argon2.hash(registerDto.password);
    const user = await this.userService.create({ ...registerDto, password });
    this.verificationService.sendVerification(user.email);
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto.email);
    const isValid = await argon2.verify(user.password, loginDto.password);
    if (!user || !isValid) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async profile(email: string) {
    return this.userService.findOne(email);
  }

  // FIX
  async decode(token: string) {
    const info = this.jwtService.decode(token);
    return info as JwtPayload;
  }

  async generateAccessToken(id: string, email: string) {
    const payload = { sub: id, email };
    const exp = parseExpireTime(this.jwtConfigService.expires_in);
    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfigService.secret,
      expiresIn: exp,
    });
    return { access_token, exp };
  }

  async generateRefreshToken(id: string) {
    const payload = { sub: id };

    const exp = parseExpireTime(this.jwtConfigService.refresh_expires_in);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfigService.refresh_secret,
      expiresIn: exp,
    });
    return { refresh_token, exp };
  }
}
