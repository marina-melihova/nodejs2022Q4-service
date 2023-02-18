import { Album } from './entity/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
// import { InMemoryDBStorage } from '../../store/in-memory.db.storage';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
// import { TrackService } from './../track/track.service';
// import { ArtistService } from './../artist/artist.service';
// import { FavoritesService } from './../favorites/favorites.service';

@Module({
  imports: [TypeOrmModule.forFeature([Album])],
  controllers: [AlbumController],
  providers: [AlbumService], //, TrackService, ArtistService, FavoritesService
  exports: [AlbumService],
})
export class AlbumModule {}
