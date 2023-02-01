import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './api/artist/atrist.module';

@Module({
  imports: [ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
