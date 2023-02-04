import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './api/artist/atrist.module';

@Module({
  imports: [ConfigModule.forRoot(), ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
