import { AppConfigModule } from '@/config/app/config.module';
import { MailerConfigModule } from '@/config/mailer/config.module';
import { MailerConfigService } from '@/config/mailer/config.service';
import { UserModule } from '@/models/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';

@Module({
  imports: [
    AppConfigModule,
    MailerConfigModule,
    JwtModule,
    UserModule,
    MailerModule.forRootAsync({
      imports: [MailerConfigModule],
      useFactory: (config: MailerConfigService) => ({
        transport: {
          host: config.host,
          port: config.port,
          secure: false,
          requireTLS: true,
          auth: {
            user: config.user,
            pass: config.password,
          },
        },
      }),
      inject: [MailerConfigService],
    }),
  ],
  controllers: [VerificationController],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}
