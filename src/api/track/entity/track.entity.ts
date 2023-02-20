import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Artist, Album, Favorites } from '../..';
import { ITrack } from '../interfaces/track.interface';

@Entity('track')
export class Track implements ITrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @ManyToOne(() => Artist, {
    onDelete: 'SET NULL',
    cascade: true,
  })
  @JoinColumn()
  artistId: string | null;

  @ManyToOne(() => Album, {
    onDelete: 'SET NULL',
    cascade: true,
  })
  @JoinColumn()
  albumId: string | null;

  @ManyToOne(() => Favorites, (fav) => fav.tracks, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  fav: Favorites;
}
