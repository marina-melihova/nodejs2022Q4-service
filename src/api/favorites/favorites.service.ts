import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites, Entity, FavEntity, IFavoritesResponse } from '..';

@Injectable()
export class FavoritesService {
  private favId: string;
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
  ) {
    this.init();
  }

  async init() {
    const rows = await this.favoritesRepository.find();
    if (rows.length) {
      this.favId = rows[0].id;
      return;
    }
    const newFavorites = this.favoritesRepository.create();
    const fav = await this.favoritesRepository.save(newFavorites);
    this.favId = fav.id;
  }

  async findAll(): Promise<Favorites> {
    const fav = await this.favoritesRepository.findOne({
      where: { id: this.favId },
      relations: ['artists', 'tracks', 'albums'],
    });

    return fav;
  }

  async findOneById(type: string, id: string): Promise<Entity | null> {
    const fav = await this.findAll();
    const favEntity = fav[type].find((item: Entity) => item.id === id);
    return favEntity ?? null;
  }

  async addToFavorite(entity: Entity): Promise<Favorites | null> {
    const nameEntity = entity.constructor.name;
    const typeEntity = FavEntity[nameEntity];
    const existEntity = await this.findOneById(typeEntity, entity.id);
    if (existEntity) {
      return null;
    }

    const fav = await this.findAll();
    fav[typeEntity].push(entity);
    return this.favoritesRepository.save(fav);
  }

  async removeFromFavorite(entity: Entity): Promise<void> {
    const nameEntity = entity.constructor.name;
    const typeEntity = FavEntity[nameEntity];
    const fav = await this.findAll();
    const idx = fav[typeEntity].findIndex(
      (item: Entity) => item.id == entity.id,
    );
    const removedItems = fav[typeEntity].splice(idx, 1);
    if (removedItems.length) {
      await this.favoritesRepository.save(fav);
    }
  }

  async getResponse(): Promise<IFavoritesResponse> {
    const fav = await this.findAll();

    fav.albums.forEach((album: any) => {
      album.artistId = album.artistId?.id ?? null;
    });

    fav.tracks.forEach((track: any) => {
      track.artistId = track.artistId?.id ?? null;
      track.albumId = track.albumId?.id ?? null;
    });

    return fav;
  }
}
