import { Module } from '@nestjs/common';
import { InMemoryDBStorage } from 'src/store/in-memory.db.storage';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackService } from './../track/track.service';
import { ArtistService } from './../artist/artist.service';
import { FavoritesService } from './../favorites/favorites.service';

@Module({
  controllers: [AlbumController],
  providers: [
    InMemoryDBStorage,
    AlbumService,
    TrackService,
    ArtistService,
    FavoritesService,
  ],
})
export class AlbumModule {}
