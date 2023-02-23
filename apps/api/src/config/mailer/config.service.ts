import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerConfigService {
  constructor(private configService: ConfigService) {}

  get host() {
    return this.configService.get<string>('mailer.host');
  }

  get port() {
    return Number(this.configService.get<string>('mailer.port'));
  }

  get user() {
    return this.configService.get<string>('mailer.user');
  }

  get password() {
    return this.configService.get<string>('mailer.password');
  }
}
