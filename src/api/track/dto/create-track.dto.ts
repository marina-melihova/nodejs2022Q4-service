import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;

  @IsInt()
  duration: number;

  artistId: string | null;
  albumId: string | null;
}
