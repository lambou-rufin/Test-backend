import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './database.providers';

@Module({
  imports: [ConfigModule], // Importe ConfigModule pour ConfigService
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}


