import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Serve static files from 'public' directory
  app.use('/public', express.static(join(__dirname, '..', 'public')));

  await app.listen(3000);
}
bootstrap();
