import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  get secret() {
    return this.configService.get<string>('jwt.secret');
  }

  get expires_in() {
    return this.configService.get<string>('jwt.expires_in');
  }

  get refresh_secret() {
    return this.configService.get<string>('jwt.refresh_secret');
  }

  get refresh_expires_in() {
    return this.configService.get<string>('jwt.refresh_expires_in');
  }
}
