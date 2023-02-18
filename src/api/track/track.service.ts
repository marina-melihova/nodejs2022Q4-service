import { Track } from './entity/track.entity';
// import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
// import { InMemoryDBStorage } from '../../store/in-memory.db.storage';
// import { Track } from './interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
// import { FavoritesService } from './../favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>, // private favoritesService: FavoritesService,
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    const track = this.trackRepository.create(createTrackDto);
    return this.trackRepository.save(track);
  }

  async findAll(): Promise<Track[]> {
    return this.trackRepository.find({ loadRelationIds: true });
  }

  async findOneById(id: string): Promise<Track | null> {
    return this.trackRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
  }

  async update(id: string, dto: UpdateTrackDto): Promise<Track | null> {
    const track: Track = await this.findOneById(id);
    if (!track) {
      return null;
    }
    const updatedTrack = await this.trackRepository.save({ id, ...dto });
    return updatedTrack;
  }

  async delete(id: string) {
    const result = await this.trackRepository.delete({ id });
    return result.affected !== 0;
  }

  /*
  findAll(): Track[] {
    return this.db.tracks;
  }

  findOneById(id: string): Track | null {
    const track = this.db.tracks.find((track: Track) => track.id === id);
    return track ?? null;
  }

  create(dto: CreateTrackDto): Track {
    const track = { id: uuidv4(), ...dto };
    this.db.tracks.push(track);
    return track;
  }

  update(id: string, dto: UpdateTrackDto): Track | null {
    const idx = this.db.tracks.findIndex((track) => track.id === id);
    if (idx === -1) {
      return null;
    }
    const updatedTrack = { ...this.db.tracks[idx], ...dto };
    this.db.tracks.splice(idx, 1, updatedTrack);
    return updatedTrack;
  }

  delete(id: string): boolean {
    const idx = this.db.tracks.findIndex((track) => track.id === id);
    if (idx === -1) {
      return false;
    }

    const result = this.favoritesService.findOneId('albums', id);
    if (!result) {
      this.favoritesService.removeId('albums', id);
    }

    this.db.tracks.splice(idx, 1);
    return true;
  }

  removeArtist(artistId: string): void {
    const allTracks = this.findAll();
    allTracks.forEach((track) => {
      if (track.artistId === artistId) {
        const { id, ...body } = track;
        this.update(track.id, { ...body, artistId: null });
      }
    });
  }

  removeAlbum(albumId: string): void {
    const allTracks = this.findAll();
    allTracks.forEach((track) => {
      if (track.albumId === albumId) {
        const { id, ...body } = track;
        this.update(track.id, { ...body, albumId: null });
      }
    });
  }
*/
}
