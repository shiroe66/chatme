import { AuthModule } from '@/auth/auth.module';
import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/app/config.module';
import { TypeormPGProvider } from '../providers/database/psql/provider';

@Module({
  imports: [AppConfigModule, TypeormPGProvider, AuthModule],
})
export class AppModule {}
