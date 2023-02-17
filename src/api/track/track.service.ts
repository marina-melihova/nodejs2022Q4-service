import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InMemoryDBStorage } from '../../store/in-memory.db.storage';
import { Track } from './interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavoritesService } from './../favorites/favorites.service';

@Injectable()
export class TrackService {
  constructor(
    private db: InMemoryDBStorage,
    private favoritesService: FavoritesService,
  ) {}

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
}
