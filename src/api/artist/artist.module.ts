import { Module } from '@nestjs/common';
// import { InMemoryDBStorage } from '../../store/in-memory.db.storage';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
// import { AlbumService } from '../album/album.service';
// import { TrackService } from '../track/track.service';
// import { FavoritesService } from '../favorites/favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entity/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [ArtistService], //, TrackService, AlbumService, FavoritesService
  exports: [ArtistService],
})
export class ArtistModule {}
