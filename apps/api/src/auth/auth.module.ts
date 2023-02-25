import { AccessGuard } from '@/common/guards';
import { JwtConfigModule } from '@/config/jwt/config.module';
import { VerificationModule } from '@/mails/verification.module';
import { UserModule } from '@/models/user/user.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';

@Module({
  imports: [VerificationModule, UserModule, JwtConfigModule, JwtModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, { provide: APP_GUARD, useClass: AccessGuard }],
})
export class AuthModule {}
