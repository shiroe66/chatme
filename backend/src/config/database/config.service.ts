import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgreSQLService {
  constructor(private configService: ConfigService) {}

  get host() {
    return this.configService.get<string>('psql.host');
  }

  get port() {
    return Number(this.configService.get<string>('psql.port'));
  }

  get username() {
    return this.configService.get<string>('psql.username');
  }

  get password() {
    return this.configService.get<string>('psql.password');
  }

  get database() {
    return this.configService.get<string>('psql.database');
  }
}
