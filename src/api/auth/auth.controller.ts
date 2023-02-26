import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { Tokens } from './types';
import { AuthService } from './auth.service';
import { User, CreateUserDto } from '..';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(@Body() dto: CreateUserDto): Promise<User> {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('login')
  async login(@Body() user: CreateUserDto): Promise<Tokens> {
    return this.authService.login(user);
  }
}
