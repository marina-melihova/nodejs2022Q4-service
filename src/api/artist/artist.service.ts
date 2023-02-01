import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InMemoryDBStorage } from 'src/store/in-memory.db.storage';
import { Artist } from './interfaces/artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private db: InMemoryDBStorage) {}

  findAll(): Artist[] {
    return this.db.artists;
  }

  findOneById(id: string): Artist | null {
    return this.db.artists.find((artist: Artist) => artist.id === id);
  }

  create(dto: CreateArtistDto): Artist {
    const artist = { id: uuidv4(), ...dto };
    this.db.artists.push(artist);
    return artist;
  }
}
