import { Injectable } from '@nestjs/common';
import { InMemoryDBStorage } from 'src/store/in-memory.db.storage';
import { FavoritesResponse } from './interfaces/favorites.interface';
import { Track } from 'src/api/track/interfaces/track.interface';
import { Album } from 'src/api/album/interfaces/album.interface';
import { Artist } from 'src/api/artist/interfaces/artist.interface';

@Injectable()
export class FavoritesService {
  constructor(private db: InMemoryDBStorage) {}

  findAll(): FavoritesResponse {
    const artistsIds: string[] = this.db.favorites.artists;
    const artists: Artist[] = this.db.artists.filter((artist: Artist) =>
      artistsIds.includes(artist.id),
    );

    const albumsIds: string[] = this.db.favorites.albums;
    const albums: Album[] = this.db.albums.filter((album: Album) =>
      albumsIds.includes(album.id),
    );

    const tracksIds: string[] = this.db.favorites.tracks;
    const tracks: Track[] = this.db.tracks.filter((track: Track) =>
      tracksIds.includes(track.id),
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  addId(type: string, id: string): number | null {
    const idx = this.db.favorites[type].findIndex(
      (entityId) => entityId === id,
    );
    if (idx !== -1) {
      return null;
    }
    return this.db.favorites[type].push(id);
  }

  removeId(type: string, id: string): boolean {
    const idx = this.db.favorites[type].findIndex(
      (entityId: string) => entityId === id,
    );

    if (idx === -1) {
      return false;
    }

    this.db.favorites[type].splice(idx, 1);
    return true;
  }
}
