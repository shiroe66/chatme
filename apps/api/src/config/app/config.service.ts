import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get url() {
    return this.configService.get<string>('app.url');
  }

  get port() {
    return Number(this.configService.get<string>('app.port'));
  }
}
