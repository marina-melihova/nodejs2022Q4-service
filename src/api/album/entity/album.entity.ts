import { Exclude } from 'class-transformer';
import { Artist } from '../../artist/entity/artist.entity';
// import { Favorite } from 'src/favorites/entities/favorite.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  @ManyToOne(() => Artist, {
    onDelete: 'SET NULL',
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artistId: string | null;
}
