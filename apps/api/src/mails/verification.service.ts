import { AppConfigService } from '@/config/app/config.service';
import { MailerConfigService } from '@/config/mailer/config.service';
import { UserService } from '@/models/user/user.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VerificationService {
  constructor(
    private mailerService: MailerService,
    private jwtService: JwtService,
    private appConfigService: AppConfigService,
    private mailerConfigService: MailerConfigService,
    private userService: UserService,
  ) {}

  async sendVerification(email: string) {
    const payload = { sub: email };

    const token = this.jwtService.sign(payload, {
      secret: this.mailerConfigService.secret,
      expiresIn: this.mailerConfigService.expires_in,
    });
    const url = `${this.appConfigService.url}:${this.appConfigService.port}/api/verify?token=${token}`;

    return this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to ChatMe! Please confirm me!',
      text: url,
    });
  }

  async verify(token: string) {
    const { sub } = this.jwtService.decode(token);
    return this.userService.verifyEmail(sub);
  }
}
