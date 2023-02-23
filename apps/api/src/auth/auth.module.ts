import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { VerificationModule } from '@/mails/verification.module';

@Module({
  imports: [VerificationModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
