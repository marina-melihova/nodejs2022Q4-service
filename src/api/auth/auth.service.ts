import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User, CreateUserDto } from '..';
import { AuthErrors, JwtPayload, Tokens } from './types';
import { TokenExpiredError } from 'jsonwebtoken';

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
      throw new ForbiddenException(AuthErrors.INVALID_CREDENTIALS);
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
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });

    return { accessToken, refreshToken };
  }

  async refresh(token: string) {
    let userId: string, login: string;
    try {
      ({ userId, login } = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      }));
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new ForbiddenException(AuthErrors.REFRESH_EXPIRED);
      } else {
        throw new ForbiddenException(AuthErrors.REFRESH_MALFORMED);
      }
    }
    const user: User = await this.userService.findOneById(userId);
    if (!user) {
      throw new ForbiddenException(AuthErrors.UNAUTHORIZED);
    }
    return this.getTokens({ login, userId });
  }
}
