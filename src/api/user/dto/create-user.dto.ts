import { IsString, IsNotEmpty } from 'class-validator';
import { ICreateUserDto } from '../interfaces/user.interface';

export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
