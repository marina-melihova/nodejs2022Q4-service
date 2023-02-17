import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './api/artist/artist.module';
import { AlbumModule } from './api/album/album.module';
import { TrackModule } from './api/track/track.module';
import { FavoritesModule } from './api/favorites/favorites.module';
import { UserModule } from './api/user/user.module';
import configService from './config/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    UserModule,
    TypeOrmModule.forRoot(configService),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
