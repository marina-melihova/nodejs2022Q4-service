import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { User } from '../api/user/entity/user.entity';

dotenv.config();

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User],
  synchronize: true,
  migrationsRun: false,
  logging: true,
  logger: 'file',
} as DataSourceOptions;
