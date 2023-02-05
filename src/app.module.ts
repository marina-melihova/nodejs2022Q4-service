import { AlbumModule } from './api/album/album.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './api/artist/atrist.module';
import { TrackModule } from './api/track/track.module';
import { FavoritesModule } from './api/favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
