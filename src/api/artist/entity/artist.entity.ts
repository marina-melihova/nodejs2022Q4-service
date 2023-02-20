import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IArtist } from '../interfaces/artist.interface';
import { Favorites } from './../..';

@Entity()
export class Artist implements IArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @ManyToOne(() => Favorites, (fav) => fav.albums, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  fav: Favorites;
}
