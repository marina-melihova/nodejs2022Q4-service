import { Track } from './entity/track.entity';
// import { ArtistService } from './../artist/artist.service';
import { Module } from '@nestjs/common';
// import { InMemoryDBStorage } from '../../store/in-memory.db.storage';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
// import { FavoritesService } from './../favorites/favorites.service';
// import { AlbumService } from './../album/album.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  controllers: [TrackController],
  providers: [TrackService], // , FavoritesService, ArtistService, AlbumService
  exports: [TrackService],
})
export class TrackModule {}
