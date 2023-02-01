import { validate as uuidValidate } from 'uuid';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller({ path: 'artist' })
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid artist ID');
    }

    const artist = this.artistService.findOneById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  @Post()
  create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }
}
