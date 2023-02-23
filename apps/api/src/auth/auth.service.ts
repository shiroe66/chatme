import { MailService } from '@/verification/verification.service';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private mailService: MailService) {}

  async register(registerDto: RegisterDto) {
    return this.mailService.sendVerification(registerDto.email);
  }
}
