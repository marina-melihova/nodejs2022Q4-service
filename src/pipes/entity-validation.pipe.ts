import {
  PipeTransform,
  Injectable,
  UnprocessableEntityException,
  ArgumentMetadata,
} from '@nestjs/common';
import { ArtistService } from '../api/artist/artist.service';
import { AlbumService } from '../api/album/album.service';
import { TrackService } from '../api/track/track.service';
import { Artist, Album, Track } from '../api';

@Injectable()
export class EntityValidationPipe implements PipeTransform {
  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {}

  async transform(id: string, { metatype }: ArgumentMetadata) {
    let service: ArtistService | AlbumService | TrackService;
    switch (metatype) {
      case Artist:
        service = this.artistService;
        break;
      case Album:
        service = this.albumService;
        break;
      case Track:
        service = this.trackService;
        break;
    }
    const entity = await service.findOneById(id);
    if (!entity) {
      throw new UnprocessableEntityException(`${metatype.name} does not exist`);
    }
    return entity;
  }
}
