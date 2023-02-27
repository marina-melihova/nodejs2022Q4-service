import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  UserModule,
  ArtistModule,
  AlbumModule,
  TrackModule,
  FavoritesModule,
} from './api';
import { configService } from './config/ormconfig';
import { AuthModule } from './api/auth/auth.module';
import { AccessGuard } from './quards/access.guard';
import { LoggerMiddleware } from './logger/logger.middleware';
import { LoggerModule } from './logger/logger.module';
import { AllExceptionsFilter } from './logger/exception-filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    UserModule,
    TypeOrmModule.forRoot(configService),
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
