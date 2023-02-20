import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entity/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create(dto: CreateAlbumDto): Promise<Album> {
    const album = this.albumRepository.create(dto);
    return this.albumRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return this.albumRepository.find({ loadRelationIds: true });
  }

  async findOneById(id: string): Promise<Album | null> {
    return this.albumRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<Album | null> {
    const album: Album = await this.findOneById(id);
    if (!album) {
      return null;
    }
    const updatedAlbum = await this.albumRepository.save({ id, ...dto });
    return updatedAlbum;
  }

  async delete(id: string) {
    const result = await this.albumRepository.delete({ id });
    return result.affected !== 0;
  }
  /*
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

    const result = this.favoritesService.findOneId('albums', id);
    if (!result) {
      this.favoritesService.removeId('albums', id);
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
*/
}
