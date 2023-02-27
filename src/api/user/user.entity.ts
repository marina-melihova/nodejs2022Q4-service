import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { IUser } from './interfaces/user.interface';

export class User implements IUser {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  login: string;

  @Exclude()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  version: number;

  @IsOptional()
  @IsNumber()
  createdAt: number;

  @IsOptional()
  @IsNumber()
  updatedAt: number;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
