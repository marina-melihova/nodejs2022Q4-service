import { Module } from '@nestjs/common';
import { InMemoryDBStorage } from 'src/store/in-memory.db.storage';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavoritesService } from './../favorites/favorites.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, InMemoryDBStorage, FavoritesService],
})
export class TrackModule {}
