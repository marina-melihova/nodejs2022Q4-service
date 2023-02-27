import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Artist, Favorites } from '../..';
import { IAlbum } from './../interfaces/album.interface';

@Entity('album')
export class Album implements IAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn()
  artistId: string | null;

  @ManyToOne(() => Favorites, (fav) => fav.albums, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  fav: Favorites;
}
