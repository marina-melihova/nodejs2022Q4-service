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
}
