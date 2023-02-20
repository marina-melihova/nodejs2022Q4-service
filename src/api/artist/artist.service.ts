import { Injectable } from '@nestjs/common';
import { Artist } from './entity/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(dto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistRepository.create(dto);
    return this.artistRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  async findOneById(id: string): Promise<Artist | null> {
    return this.artistRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateArtistDto): Promise<Artist | null> {
    const artist: Artist = await this.findOneById(id);
    if (!artist) {
      return null;
    }
    const updatedArtist = await this.artistRepository.save({ id, ...dto });
    return updatedArtist;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.artistRepository.delete({ id });
    return result.affected !== 0;
  }
}
