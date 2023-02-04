import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InMemoryDBStorage } from 'src/store/in-memory.db.storage';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private db: InMemoryDBStorage) {}

  findAll(): Album[] {
    return this.db.albums;
  }

  findOneById(id: string): Album | null {
    const album = this.db.albums.find((album: Album) => album.id === id);
    return album ?? null;
  }

  create(dto: CreateAlbumDto): Album {
    const album = { id: uuidv4(), ...dto };
    this.db.albums.push(album);
    return album;
  }

  update(id: string, dto: UpdateAlbumDto): Album | null {
    const idx = this.db.albums.findIndex((album) => album.id === id);
    if (idx === -1) {
      return null;
    }
    const updatedAlbum = { ...this.db.albums[idx], ...dto };
    this.db.albums.splice(idx, 1, updatedAlbum);
    return updatedAlbum;
  }

  delete(id: string): boolean {
    const idx = this.db.albums.findIndex((album) => album.id === id);
    if (idx === -1) {
      return false;
    }
    this.db.albums.splice(idx, 1);
    return true;
  }

  removeArtist(artistId: string): void {
    const allAlbums = this.findAll();
    allAlbums.forEach((album) => {
      if (album.artistId === artistId) {
        const { id, ...body } = album;
        this.update(album.id, { ...body, artistId: null });
      }
    });
  }
}
