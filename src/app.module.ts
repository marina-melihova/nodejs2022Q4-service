import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './api/artist/atrist.module';
import { TrackModule } from './api/track/track.module';

@Module({
  imports: [ConfigModule.forRoot(), ArtistModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
