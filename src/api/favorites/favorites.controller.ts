import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Artist, Album, Track, Entity } from '..';
import { EntityValidationPipe, EntityInFavsValidationPipe } from '../../pipes';

@Controller('favs')
@UseInterceptors(ClassSerializerInterceptor)
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return this.favoritesService.getResponse();
  }

  private async addEntity(entity: Entity) {
    const nameEntity = entity.constructor.name;
    const result = await this.favoritesService.addToFavorite(entity);
    if (!result) {
      return {
        message: `${nameEntity} with the same ID already added to Favorites`,
      };
    }
    return { message: `${nameEntity} successfully added` };
  }

  @Post(`/artist/:id`)
  async addArtist(
    @Param('id', ParseUUIDPipe, EntityValidationPipe) artist: Artist,
  ) {
    this.addEntity(artist);
  }

  @Post('/album/:id')
  async addAlbum(
    @Param('id', ParseUUIDPipe, EntityValidationPipe) album: Album,
  ) {
    this.addEntity(album);
  }

  @Post('/track/:id')
  async addTrack(
    @Param('id', ParseUUIDPipe, EntityValidationPipe) track: Track,
  ) {
    this.addEntity(track);
  }

  private async removeEntity(entity: Entity) {
    this.favoritesService.removeFromFavorite(entity);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async removeArtist(
    @Param('id', ParseUUIDPipe, EntityInFavsValidationPipe) artist: Artist,
  ) {
    this.removeEntity(artist);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(
    @Param('id', ParseUUIDPipe, EntityInFavsValidationPipe) album: Album,
  ) {
    this.removeEntity(album);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(
    @Param('id', ParseUUIDPipe, EntityInFavsValidationPipe) track: Track,
  ) {
    this.removeEntity(track);
  }
}
