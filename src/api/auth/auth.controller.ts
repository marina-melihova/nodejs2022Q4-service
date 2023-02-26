import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../../decorators/public.decorator';
import { Tokens } from './types';
import { AuthService } from './auth.service';
import { User, CreateUserDto } from '..';

@Public()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: CreateUserDto): Promise<User> {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() user: CreateUserDto): Promise<Tokens> {
    return this.authService.login(user);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refresh(@Body('refreshToken') token: string): Promise<Tokens> {
    return this.authService.refresh(token);
  }
}
