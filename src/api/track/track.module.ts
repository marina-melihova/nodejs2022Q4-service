import { ArtistService } from './../artist/artist.service';
import { Module } from '@nestjs/common';
import { InMemoryDBStorage } from '../../store/in-memory.db.storage';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavoritesService } from './../favorites/favorites.service';
import { AlbumService } from './../album/album.service';

@Module({
  controllers: [TrackController],
  providers: [
    InMemoryDBStorage,
    TrackService,
    FavoritesService,
    ArtistService,
    AlbumService,
  ],
})
export class TrackModule {}
