import { Album } from 'src/api/album/interfaces/album.interface';
import { Artist } from 'src/api/artist/interfaces/artist.interface';
import { Track } from 'src/api/track/interfaces/track.interface';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
