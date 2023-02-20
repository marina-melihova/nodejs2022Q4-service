import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  UserModule,
  ArtistModule,
  AlbumModule,
  TrackModule,
  FavoritesModule,
} from './api';
import { configService } from './config/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavoritesModule),
    UserModule,
    TypeOrmModule.forRoot(configService),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
