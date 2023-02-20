import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
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

  @Post(`/artist/:id`)
  async addArtist(
    @Param('id', ParseUUIDPipe, EntityValidationPipe) artist: Artist,
  ) {
    await this.addEntity(artist);
  }

  @Post('/album/:id')
  async addAlbum(
    @Param('id', ParseUUIDPipe, EntityValidationPipe) album: Album,
  ) {
    await this.addEntity(album);
  }

  @Post('/track/:id')
  async addTrack(
    @Param('id', ParseUUIDPipe, EntityValidationPipe) track: Track,
  ) {
    await this.addEntity(track);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(
    @Param('id', ParseUUIDPipe, EntityInFavsValidationPipe) artist: Artist,
  ) {
    await this.removeEntity(artist);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(
    @Param('id', ParseUUIDPipe, EntityInFavsValidationPipe) album: Album,
  ) {
    await this.removeEntity(album);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(
    @Param('id', ParseUUIDPipe, EntityInFavsValidationPipe) track: Track,
  ) {
    await this.removeEntity(track);
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

  private async removeEntity(entity: Entity) {
    await this.favoritesService.removeFromFavorite(entity);
  }
}
