import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  duration: number;

  artistId: string | null;

  albumId: string | null;
}
