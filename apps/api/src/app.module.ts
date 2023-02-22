import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { TypeormPGProvider } from './providers/database/psql/provider';
import { UserModule } from './models/user/user.module';

@Module({
  imports: [AppConfigModule, TypeormPGProvider, UserModule],
})
export class AppModule {}
