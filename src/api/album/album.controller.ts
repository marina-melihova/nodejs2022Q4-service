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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.findOneById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Post()
  async create(@Body() dto: CreateAlbumDto) {
    try {
      const newAlbum = await this.albumService.create(dto);
      return newAlbum;
    } catch {
      throw new NotFoundException(`Artist with ID = ${dto.artistId} not found`);
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateAlbumDto,
  ) {
    try {
      const album = await this.albumService.update(id, dto);
      if (!album) {
        throw new NotFoundException('Album not found');
      }
      return album;
    } catch {
      throw new NotFoundException(`Artist with ID = ${dto.artistId} not found`);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.albumService.delete(id);
    if (!result) {
      throw new NotFoundException('Album not found');
    }
  }
}
