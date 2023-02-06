import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Put,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from './../track/track.service';
import { ArtistService } from './../artist/artist.service';

@Controller('album')
export class AlbumController {
  constructor(
    private albumService: AlbumService,
    private tracksService: TrackService,
    private artistService: ArtistService,
  ) {}

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.findOneById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Post()
  create(@Body() dto: CreateAlbumDto) {
    this.validateRefs(dto);
    return this.albumService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateAlbumDto,
  ) {
    this.validateRefs(dto);
    const album = this.albumService.update(id, dto);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.albumService.delete(id);
    if (!result) {
      throw new NotFoundException('Album not found');
    }
    this.tracksService.removeAlbum(id);
  }

  validateRefs(dto: CreateAlbumDto | UpdateAlbumDto) {
    if (dto.artistId) {
      const isArtistExist = this.artistService.findOneById(dto.artistId);
      if (!isArtistExist) {
        throw new NotFoundException(
          `Artist with ID = ${dto.artistId} not found`,
        );
      }
    }
  }
}
