import {
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
  UnprocessableEntityException,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  SetMetadata,
} from '@nestjs/common';
// import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
// import { TrackService } from '../track/track.service';
import { FavoritesService } from './favorites.service';
import { Artist } from '../artist/entity/artist.entity';
import { EntityValidationPipe } from '../../pipes/entity-validation.pipe';
import { Repository } from 'typeorm';

@Controller('favs')
@UseInterceptors(ClassSerializerInterceptor)
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService, // private artistService: ArtistService, // private albumService: AlbumService, // private trackService: TrackService,
  ) {}
  /*
  private async isEntityExist(type: string, id: string) {
    const result = await this.favoritesService.findOneById();
  }
*/
  @Get()
  async findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/artist/:id')
  async addArtist(
    @Param('id', ParseUUIDPipe, EntityValidationPipe) artist: Artist,
  ) {
    const result = await this.favoritesService.addToFavorite('artists', artist);
    if (!result) {
      return { message: 'Artist with same ID was already added to Favorites' };
    }
    return { message: 'Artist was successfully added' };
  }
  /*
  @Post('/album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.findOneById(id);
    if (!album) {
      throw new UnprocessableEntityException('Album does not exist');
    }
    const result = this.favoritesService.addId('albums', id);
    if (!result) {
      return { message: 'Album with same ID was already added to Favorites' };
    }
    return { message: 'Album was successfully added' };
  }

  @Post('/track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.findOneById(id);
    if (!track) {
      throw new UnprocessableEntityException('Track does not exist');
    }
    const result = this.favoritesService.addId('tracks', id);
    if (!result) {
      return { message: 'Track with same ID was already added to Favorites' };
    }
    return { message: 'Track was successfully added' };
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favoritesService.removeId('artists', id);
    if (!result) {
      throw new NotFoundException('Artist not found');
    }
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favoritesService.removeId('albums', id);
    if (!result) {
      throw new NotFoundException('Album not found');
    }
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favoritesService.removeId('tracks', id);
    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }
*/
}
