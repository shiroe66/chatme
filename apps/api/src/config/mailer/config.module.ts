import Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MAIL_HOST: Joi.string().required().default('smtp.gmail.com'),
        MAIL_PORT: Joi.number().required().default(587),
        MAIL_USER: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
        MAIL_SECRET: Joi.string().required().default('secret'),
        MAIL_EXPIRES_IN: Joi.string().required().default('21600'),
      }),
    }),
  ],
  providers: [MailerConfigService],
  exports: [MailerConfigService],
})
export class MailerConfigModule {}
