import {
  PipeTransform,
  Injectable,
  UnprocessableEntityException,
  ArgumentMetadata,
} from '@nestjs/common';
import { ArtistService } from '../api/artist/artist.service';
import { Artist } from '../api/artist/entity/artist.entity';
import { AlbumService } from '../api/album/album.service';
import { Album } from '../api/album/entity/album.entity';

@Injectable()
export class EntityValidationPipe implements PipeTransform {
  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
  ) {}
  async transform(id: string, { metatype }: ArgumentMetadata) {
    let service: ArtistService | AlbumService;
    switch (metatype) {
      case Artist:
        service = this.artistService;
        break;
      case Album:
        service = this.albumService;
        break;
    }
    const entity = await service.findOneById(id);
    if (!entity) {
      throw new UnprocessableEntityException(`${metatype.name} does not exist`);
    }
    return entity;
  }
}
