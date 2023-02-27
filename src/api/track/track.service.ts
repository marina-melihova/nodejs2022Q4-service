import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entity/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = this.trackRepository.create(createTrackDto);
    return this.trackRepository.save(track);
  }

  async findAll(): Promise<Track[]> {
    return this.trackRepository.find({ loadRelationIds: true });
  }

  async findOneById(id: string): Promise<Track | null> {
    return this.trackRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
  }

  async update(id: string, dto: UpdateTrackDto): Promise<Track | null> {
    const track: Track = await this.findOneById(id);
    if (!track) {
      return null;
    }
    const updatedTrack = await this.trackRepository.save({ id, ...dto });
    return updatedTrack;
  }

  async delete(id: string): Promise<void> {
    const result = await this.trackRepository.delete({ id });
    if (!result.affected) {
      throw new NotFoundException('Track not found');
    }
  }
}
