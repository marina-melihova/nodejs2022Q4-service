import { Favorites } from './../api/favorites/entity/favorites.entity';
import * as dotenv from 'dotenv';
import { DataSourceOptions, DataSource } from 'typeorm';
import { User } from '../api/user/entity/user.entity';
import { Artist } from '../api/artist/entity/artist.entity';
import { Track } from './../api/track/entity/track.entity';
import { Album } from './../api/album/entity/album.entity';

dotenv.config();

export const configService = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Artist, Album, Track, Favorites],
  synchronize: false,
  migrationsRun: false,
  logging: true,
  logger: 'file',
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
} as DataSourceOptions;

export default new DataSource(configService);
