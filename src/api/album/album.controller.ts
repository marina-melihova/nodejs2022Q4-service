import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { NotFoundInterceptor } from './../../interceptors';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(NotFoundInterceptor)
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.findOneById(id);
  }

  @Post()
  async create(@Body() dto: CreateAlbumDto) {
    return this.albumService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.delete(id);
  }
}
