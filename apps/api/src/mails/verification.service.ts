import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VerificationService {
  constructor(private mailerService: MailerService) {}

  async sendVerification(email: string) {
    const text = 'heeey';
    return this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to ChatMe! Please confirm me!',
      text,
    });
  }
}
