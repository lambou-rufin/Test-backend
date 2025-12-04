import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { MulterExceptionFilter } from './multer-exception.filter';

async function bootstrap() {
  // Charger le .env AVANT Nest
  dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || '.env' });

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Ports & CORS
  const port = configService.get('PORT') || 3001;

  const corsOrigins =
    configService.get('CORS_ORIGINS') ||
    'http://localhost:3000';

  // Middlewares JSON
  // app.use(json({ limit: '10gb' }));
  // app.use(urlencoded({ extended: true, limit: '10gb' }));

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // CORS
  app.enableCors({
    origin: corsOrigins.split(',').map((o) => o.trim()),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Filtres globaux
  app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalFilters(new MulterExceptionFilter());

  // Timeout illimité
  app.use((req, res, next) => {
    req.setTimeout(0);
    next();
  });

  // --- Swagger ---
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation Gestion Ticket')
    .setDescription('Documentation de l’API pour votre système de gestion de tickets')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDoc);

  // Start server
  const server = await app.listen(port);
  server.setTimeout(0);

  console.log(`🚀 Application running on http://localhost:${port}`);
  // console.log(`📘 Swagger Docs >>> http://localhost:${port}`);
}

bootstrap();
