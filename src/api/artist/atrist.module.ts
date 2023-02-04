import { TrackService } from './../track/track.service';
import { Module } from '@nestjs/common';
import { InMemoryDBStorage } from 'src/store/in-memory.db.storage';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  controllers: [ArtistController],
  providers: [InMemoryDBStorage, ArtistService, TrackService],
})
export class ArtistModule {}
