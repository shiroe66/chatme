import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgreSQLService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        PSQL_HOST: Joi.string().default('localhost'),
        PSQL_PORT: Joi.number().default(5432),
        PSQL_USERNAME: Joi.string().default('postgres'),
        PSQL_PASSWORD: Joi.string().default('postgres'),
        PSQL_DATABASE: Joi.string().default('api'),
      }),
    }),
  ],
  providers: [ConfigService, PostgreSQLService],
  exports: [ConfigService, PostgreSQLService],
})
export class PostgreSQLModule {}
