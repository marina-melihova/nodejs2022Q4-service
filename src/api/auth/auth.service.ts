import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User, CreateUserDto } from '..';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  async login(dto: CreateUserDto): Promise<Tokens> {
    const user: User = await this.userService.findOneByLogin(dto.login);
    const isPasswordMatch = await bcrypt.compare(dto.password, user.password);
    if (!user || !isPasswordMatch) {
      throw new ForbiddenException('Incorrect login credentials');
    }
    const payload = { login: user.login, userId: user.id };
    return this.getTokens(payload);
  }

  private getTokens(payload: JwtPayload): Tokens {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_KEY,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_KEY,
    });

    return { accessToken, refreshToken };
  }
}
