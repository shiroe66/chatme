import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().default('my_secret'),
        JWT_EXPIRES_IN: Joi.string().default('15m'),
        REFRESH_SECRET: Joi.string().default('my_refresh_secret'),
        REFRESH_EXPIRES_IN: Joi.string().default('24h'),
      }),
    }),
  ],
  providers: [JwtConfigService],
  exports: [JwtConfigService],
})
export class JwtConfigModule {}
