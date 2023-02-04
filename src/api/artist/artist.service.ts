import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InMemoryDBStorage } from 'src/store/in-memory.db.storage';
import { Artist } from './interfaces/artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private db: InMemoryDBStorage) {}

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
    this.db.artists.splice(idx, 1);
    return true;
  }
}
