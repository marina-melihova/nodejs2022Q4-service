import { Artist } from '../artist/entity/artist.entity';
import { Favorites } from './entity/favorites.entity';
import { Injectable } from '@nestjs/common';
// import { InMemoryDBStorage } from '../../store/in-memory.db.storage';
import { FavoritesResponse } from './interfaces/favorites.interface';
// import { Track } from 'src/api/track/interfaces/track.interface';
// import { Album } from 'src/api/album/interfaces/album.interface';
// import { Artist } from 'src/api/artist/interfaces/artist.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  private _id: string;
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
  ) {
    this.init();
  }

  async init() {
    const rows = await this.favoritesRepository.find();
    if (rows.length) {
      this._id = rows[0].id;
      return;
    }
    const newFavorites = this.favoritesRepository.create();
    console.log('newFavorites :>> ', newFavorites);
    const favorites = await this.favoritesRepository.save(newFavorites);
    this._id = favorites.id;
  }

  async findAll(): Promise<Favorites> {
    const fav = await this.favoritesRepository.findOne({
      where: { id: this._id },
      relations: {
        artists: true,
        // tracks: true,
        // albums: true,
      },
    });

    return fav;
  }

  async addToFavorite(type: string, entity): Promise<number | null> {
    const fav = await this.findAll();
    const idx = fav[type].findIndex((item) => item.id === entity.id);
    if (idx !== -1) {
      return null;
    }

    const count = fav[type].push(entity);
    const result = await this.favoritesRepository.save(fav);
    if (result) {
      return count;
    }
  }

  async removeFromFavorite(type: string, id: number) {
    const fav = await this.findAll();
    fav[type].splice(id, 1);
    return this.favoritesRepository.save(fav);
  }
  /*
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

  findOneId(type: string, id: string): boolean {
    const idx = this.db.favorites[type].findIndex(
      (entityId) => entityId === id,
    );
    if (idx !== -1) {
      return false;
    }
    return true;
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
*/
}
