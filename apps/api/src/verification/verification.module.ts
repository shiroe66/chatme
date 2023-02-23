import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfigModule } from '@/config/mailer/config.module';
import { MailerConfigService } from '@/config/mailer/config.service';
import { MailService } from './verification.service';

@Module({
  imports: [
    MailerConfigModule,
    MailerModule.forRootAsync({
      imports: [MailerConfigModule],
      useFactory: (config: MailerConfigService) => {
        return {
          transport: {
            host: config.host,
            port: config.port,
            secure: false,
            requireTLS: true,
            logger: true,
            auth: {
              user: config.user,
              pass: config.password,
            },
          },
        };
      },
      inject: [MailerConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
