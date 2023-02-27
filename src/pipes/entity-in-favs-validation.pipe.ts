import {
  PipeTransform,
  Injectable,
  NotFoundException,
  ArgumentMetadata,
} from '@nestjs/common';
import { FavoritesService } from '../api/favorites/favorites.service';
import { FavEntity } from '../api';

@Injectable()
export class EntityInFavsValidationPipe implements PipeTransform {
  constructor(private favoritesService: FavoritesService) {}

  async transform(id: string, { metatype }: ArgumentMetadata) {
    const nameEntity = metatype.name;
    const typeEntity = FavEntity[nameEntity];
    const entity = await this.favoritesService.findOneById(typeEntity, id);
    if (!entity) {
      throw new NotFoundException(`${metatype.name} not found`);
    }
    return entity;
  }
}
