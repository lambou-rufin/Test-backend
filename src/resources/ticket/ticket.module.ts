import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database.module';
import { MulterModule } from '@nestjs/platform-express';
import { createMulterConfig } from 'src/config/multer.config';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';

@Module({
  imports: [
    DatabaseModule,
    // MulterModule.register(createMulterConfig('tickets')),
  ],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}
