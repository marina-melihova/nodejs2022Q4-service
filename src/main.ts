import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import * as path from 'path';
import * as yaml from 'yaml';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const dir = process.cwd();
  const apiPath = path.resolve(process.cwd(), './doc/api.yaml');
  const apiFile = await readFile(apiPath, { encoding: 'utf8' });
  const schema = yaml.parse(apiFile);
  SwaggerModule.setup('api', app, schema);
  await app.listen(4000);
}
bootstrap();
