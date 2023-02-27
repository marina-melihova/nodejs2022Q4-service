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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ArtistService } from './../artist/artist.service';
import { AlbumService } from './../album/album.service';

@Controller('track')
export class TrackController {
  constructor(
    private trackService: TrackService,
    private artistService: ArtistService,
    private albumService: AlbumService,
  ) {}

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.findOneById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Post()
  create(@Body() dto: CreateTrackDto) {
    this.validateRefs(dto);
    return this.trackService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTrackDto,
  ) {
    this.validateRefs(dto);
    const track = this.trackService.update(id, dto);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.trackService.delete(id);
    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }

  validateRefs(dto: CreateTrackDto | UpdateTrackDto) {
    if (dto.artistId) {
      const isArtistExist = this.artistService.findOneById(dto.artistId);
      if (!isArtistExist) {
        throw new NotFoundException(
          `Artist with ID = ${dto.artistId} not found`,
        );
      }
    }

    if (dto.albumId) {
      const isAlbumExist = this.albumService.findOneById(dto.albumId);
      if (!isAlbumExist) {
        throw new NotFoundException(`Album with ID = ${dto.albumId} not found`);
      }
    }
  }
}
