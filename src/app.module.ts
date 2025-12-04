import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileTypeFilterMiddleware } from './fileTypeFilterMiddleware';

// 👉 Votre module Ticket
import { TicketModule } from './resources/ticket/ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
      isGlobal: true,
    }),

    // ServeStaticModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => [
    //     {
    //       rootPath: configService.get<string>('UPLOADS_PATH', './uploads'),
    //       serveRoot: '/uploads',
    //       // exclude: ['/api*'],
          
    //     },
    //   ],
    // }),

    DatabaseModule,
    TicketModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {
  constructor() {}

  // configure(consumer: MiddlewareConsumer) {
  //   // 👉 Seulement votre middleware
  //   consumer
  //     .apply(FileTypeFilterMiddleware)
  //     .forRoutes('/uploads/*');
  // }
}
