import { HeadersInterceptor } from './interceptors/headers.interceptor';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import * as yaml from 'yaml';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new HeadersInterceptor());
  app.useLogger(app.get(LoggerService));

  const apiFile = await readFile('./doc/api.yaml', { encoding: 'utf8' });
  const schema = yaml.parse(apiFile);
  SwaggerModule.setup('doc', app, schema);

  const PORT = config.port || 4000;
  await app.listen(PORT);
}
bootstrap();
