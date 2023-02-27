import { IArtist, IAlbum, ITrack } from '../..';

export interface IFavorites {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
