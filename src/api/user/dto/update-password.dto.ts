import { IsString, IsNotEmpty } from 'class-validator';
import { IUpdatePasswordDto } from '../interfaces/user.interface';

export class UpdatePasswordDto implements IUpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
