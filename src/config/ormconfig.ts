import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { DataSourceOptions } from 'typeorm';
import { User } from '../api/user/entities/user.entity';

dotenv.config();

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'db',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'test',
  entities: [User],
  synchronize: false,
  migrationsRun: false,
  logging: true,
  logger: 'file',
} as DataSourceOptions;
