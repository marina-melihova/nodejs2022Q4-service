import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
