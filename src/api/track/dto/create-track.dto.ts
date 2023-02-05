import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  duration: number;

  artistId: string | null;
  albumId: string | null;
}
