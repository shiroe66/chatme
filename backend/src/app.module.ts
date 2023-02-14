import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { TypeormPGProvider } from './providers/database/psql/provider';

@Module({
  imports: [AppConfigModule, TypeormPGProvider],
})
export class AppModule {}
