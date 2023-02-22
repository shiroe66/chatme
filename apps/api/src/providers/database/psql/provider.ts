import { PostgreSQLModule } from '@/config/database/config.module';
import { PostgreSQLService } from '@/config/database/config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgreSQLModule],
      useFactory: (config: PostgreSQLService) => ({
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        entities: [__dirname + '/**/*.entity.ts'],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [PostgreSQLService],
    }),
  ],
})
export class TypeormPGProvider {}
