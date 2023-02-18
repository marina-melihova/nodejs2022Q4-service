// import { Album } from '../../album/entity/album.entity';
import { Artist } from '../../artist/entity/artist.entity';
// import { Track } from '../../track/entity/track.entity';
import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('favorites')
export class Favorites {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Artist, (artist) => artist.fav, {
    cascade: true,
  })
  @JoinColumn({ referencedColumnName: 'id' })
  artists: Artist[];
}
