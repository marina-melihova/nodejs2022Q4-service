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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.findOneById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Post()
  async create(@Body() dto: CreateTrackDto) {
    try {
      const newTrack = await this.trackService.create(dto);
      return newTrack;
    } catch (error) {
      throw new NotFoundException(`Entity with such ID not found`);
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTrackDto,
  ) {
    try {
      const track = await this.trackService.update(id, dto);
      if (!track) {
        throw new NotFoundException('Track not found');
      }
      return track;
    } catch (error) {
      console.log('error.message :>> ', error.message);
      throw new NotFoundException(`Entity with such ID not found`);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.trackService.delete(id);
    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }
}
