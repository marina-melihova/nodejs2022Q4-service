import { Module } from '@nestjs/common';
import { InMemoryDBStorage } from 'src/store/in-memory.db.storage';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumService } from '../album/album.service';
import { TrackService } from './../track/track.service';
import { FavoritesService } from './../favorites/favorites.service';

@Module({
  controllers: [ArtistController],
  providers: [
    InMemoryDBStorage,
    ArtistService,
    TrackService,
    AlbumService,
    FavoritesService,
  ],
})
export class ArtistModule {}
