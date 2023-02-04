import { Module } from '@nestjs/common';
import { InMemoryDBStorage } from 'src/store/in-memory.db.storage';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackService } from './../track/track.service';

@Module({
  controllers: [AlbumController],
  providers: [InMemoryDBStorage, AlbumService, TrackService],
})
export class AlbumModule {}
