import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'fs/promises';
import * as yaml from 'yaml';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 4000;

  const apiFile = await readFile('./doc/api.yaml', { encoding: 'utf8' });
  const schema = yaml.parse(apiFile);
  SwaggerModule.setup('doc', app, schema);

  await app.listen(PORT);
}
bootstrap();
