import { Album } from 'src/api/album/interfaces/album.interface';
import { Artist } from 'src/api/artist/interfaces/artist.interface';
import { Track } from 'src/api/track/interfaces/track.interface';

export interface FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
