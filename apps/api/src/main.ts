import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppConfigService } from './config/app/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: AppConfigService = app.get(AppConfigService);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = config.port;
  await app.listen(port || 3000);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
