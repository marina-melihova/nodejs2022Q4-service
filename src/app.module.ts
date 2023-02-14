import { AlbumModule } from './api/album/album.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './api/artist/atrist.module';
import { TrackModule } from './api/track/track.module';
import { FavoritesModule } from './api/favorites/favorites.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST') || 'db',
        port: +configService.get<number>('POSTGRES_PORT') || 5432,
        username: configService.get('POSTGRES_USER') || 'postgres',
        password: configService.get('POSTGRES_PASSWORD') || 'postgres',
        database: configService.get('POSTGRES_DB') || 'postgres',
        entities: [],
        synchronize: true,
      }),
    }),
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
