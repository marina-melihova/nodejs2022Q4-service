import { Artist } from './artist/entity/artist.entity';
import { Album } from './album/entity/album.entity';
import { Track } from './track/entity/track.entity';
import { Favorites } from './favorites/entity/favorites.entity';

export const enitities = [Artist, Album, Track, Favorites];
export type Entity = Artist | Album | Track;
export enum FavEntity {
  Artist = 'artists',
  Album = 'albums',
  Track = 'tracks',
}
export { Artist, Album, Track, Favorites };
export { User } from './user/entity/user.entity';

export { IArtist } from './artist/interfaces/artist.interface';
export { IAlbum } from './album/interfaces/album.interface';
export { ITrack } from './track/interfaces/track.interface';
export { IFavorites } from './favorites/interfaces/favorites.interface';
export { IUser } from './user/interfaces/user.interface';

export { UserModule } from './user/user.module';
export { ArtistModule } from './artist/artist.module';
export { AlbumModule } from './album/album.module';
export { TrackModule } from './track/track.module';
export { FavoritesModule } from './favorites/favorites.module';
