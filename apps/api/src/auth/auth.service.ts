import { VerificationService } from '@/mails/verification.service';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private mailService: VerificationService) {}

  async register(registerDto: RegisterDto) {
    return this.mailService.sendVerification(registerDto.email);
  }
}
