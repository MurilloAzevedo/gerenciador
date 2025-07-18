import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { DbController } from './db.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'process';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async (ConfigService: ConfigService) => ({
      type: 'postgres',
      host: ConfigService.get<string>('DB_HOST'),
      port: ConfigService.get<number>('DB_PORT'),
      username: ConfigService.get<string>('DB_USERNAME'),
      password: ConfigService.get<string>('DB_PASSWORD'),
      database: ConfigService.get<string>('DB_NAME'),
      entities: [__dirname + '/entities/**'],
      migrations: [__dirname + '/migrations/**.ts'],
      synchronize: false
    }),
    inject: [ConfigService]
  })],
  controllers: [DbController],
  providers: [DbService],
})
export class DbModule {}
