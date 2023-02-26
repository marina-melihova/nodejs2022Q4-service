import * as dotenv from 'dotenv';
import { DataSourceOptions, DataSource } from 'typeorm';
import { User, Artist, Album, Track, Favorites } from '../api';

dotenv.config();

export const configService = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Artist, Album, Track, Favorites],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  logger: 'file',
  migrations: ['src/migrations/**/*.ts'],
} as DataSourceOptions;

export default new DataSource(configService);
