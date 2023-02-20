import { Favorites } from './entity/favorites.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
// import { APP_PIPE } from '@nestjs/core';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistModule } from '../artist/artist.module';
// import { EntityValidationPipe } from '../../pipes/entity-validation.pipe';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
// import { InMemoryDBStorage } from '../../store/in-memory.db.storage';
// import { ArtistService } from '../artist/artist.service';
// import { AlbumService } from '../album/album.service';
// import { TrackService } from '../track/track.service';

@Module({
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([Favorites]),
  ],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
