import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Artist, Album, Track, IFavorites } from '../..';

@Entity('favorites')
export class Favorites implements IFavorites {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Artist, (artist) => artist.fav)
  @JoinColumn()
  artists: Artist[];

  @OneToMany(() => Album, (album) => album.fav)
  @JoinColumn()
  albums: Album[];

  @OneToMany(() => Track, (track) => track.fav)
  @JoinColumn()
  tracks: Track[];
}
