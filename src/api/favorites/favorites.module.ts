import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { InMemoryDBStorage } from 'src/store/in-memory.db.storage';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Module({
  providers: [
    InMemoryDBStorage,
    FavoritesService,
    ArtistService,
    AlbumService,
    TrackService,
  ],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
