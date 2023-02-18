// import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
// import { InMemoryDBStorage } from '../../store/in-memory.db.storage';
import { Artist } from './entity/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
// import { FavoritesService } from './../favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>, // private favoritesService: FavoritesService,
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

  async delete(id: string) {
    const result = await this.artistRepository.delete({ id });
    return result.affected !== 0;
  }
  /*
  findAll(): Artist[] {
    return this.db.artists;
  }

  findOneById(id: string): Artist | null {
    const artist = this.db.artists.find((artist: Artist) => artist.id === id);
    return artist ?? null;
  }

  create(dto: CreateArtistDto): Artist {
    const artist = { id: uuidv4(), ...dto };
    this.db.artists.push(artist);
    return artist;
  }

  update(id: string, dto: UpdateArtistDto): Artist | null {
    const idx = this.db.artists.findIndex((artist) => artist.id === id);
    if (idx === -1) {
      return null;
    }
    const updatedArtist = { ...this.db.artists[idx], ...dto };
    this.db.artists.splice(idx, 1, updatedArtist);
    return updatedArtist;
  }

  delete(id: string): boolean {
    const idx = this.db.artists.findIndex((artist) => artist.id === id);
    if (idx === -1) {
      return false;
    }

    const result = this.favoritesService.findOneId('artists', id);
    if (!result) {
      this.favoritesService.removeId('artists', id);
    }

    this.db.artists.splice(idx, 1);
    return true;
  }
*/
}
