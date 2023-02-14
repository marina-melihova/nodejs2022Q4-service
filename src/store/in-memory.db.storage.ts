import { Injectable } from '@nestjs/common';
import { Album } from 'src/api/album/interfaces/album.interface';
import { Artist } from 'src/api/artist/interfaces/artist.interface';
import { Track } from 'src/api/track/interfaces/track.interface';

@Injectable()
export class InMemoryDBStorage {
  albums: Album[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  private static db: InMemoryDBStorage;

  constructor() {
    if (!InMemoryDBStorage.db) {
      InMemoryDBStorage.db = this;
    }

    return InMemoryDBStorage.db;
  }
}
