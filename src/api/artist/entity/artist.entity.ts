import { Favorites } from './../../favorites/entity/favorites.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @ManyToOne(() => Favorites, (fav) => fav.artists, {
    onDelete: 'CASCADE',
  })
  fav: Favorites;
}
