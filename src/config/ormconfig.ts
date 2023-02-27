import * as dotenv from 'dotenv';
import { DataSourceOptions, DataSource, FileLogger } from 'typeorm';
import { User, Artist, Album, Track, Favorites } from '../api';

dotenv.config();

export const configService = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  migrationsRun: true,
  entities: [User, Artist, Album, Track, Favorites],
  migrations: ['src/migrations/**/*.ts'],
  logging: true,
  logger: new FileLogger(true, { logPath: './logs/ormlogs.log' }),
} as DataSourceOptions;

export default new DataSource(configService);
