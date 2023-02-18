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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
// import { TrackService } from './../track/track.service';
// import { AlbumService } from './../album/album.service';

@Controller('artist')
export class ArtistController {
  constructor(
    private artistService: ArtistService, // private tracksService: TrackService,
  ) // private albumsService: AlbumService,
  {}

  @Get()
  async findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistService.findOneById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @Post()
  async create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    const artist = await this.artistService.update(id, dto);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.artistService.delete(id);
    if (!result) {
      throw new NotFoundException('Artist not found');
    }
    // this.tracksService.removeArtist(id);
    // this.albumsService.removeArtist(id);
  }
}
