import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateAlbumDto {
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  artistId: string | null;
}
