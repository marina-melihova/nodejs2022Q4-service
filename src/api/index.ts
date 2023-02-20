import { Artist } from './artist/entity/artist.entity';
import { Album } from './album/entity/album.entity';
import { Track } from './track/entity/track.entity';
import { Favorites } from './favorites/entity/favorites.entity';
// import { ArtistService } from './artist/artist.service';
// import { AlbumService } from './album/album.service';
// import { TrackService } from './track/track.service';

export const enitities = [Artist, Album, Track, Favorites];
export type Entity = Artist | Album | Track;
export enum FavEntity {
  Artist = 'artists',
  Album = 'albums',
  Track = 'tracks',
}
export { Artist, Album, Track, Favorites };

export { IArtist } from './artist/interfaces/artist.interface';
export { IAlbum } from './album/interfaces/album.interface';
export { ITrack } from './track/interfaces/track.interface';
export { IFavorites } from './favorites/interfaces/favorites.interface';

// export type EntityService = ArtistService | AlbumService | TrackService;
// export { ArtistService, AlbumService, TrackService };
// export { FavoritesService } from './favorites/favorites.service';
