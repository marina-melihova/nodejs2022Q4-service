import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '..';

@Module({
  imports: [JwtModule.register({}), forwardRef(() => UserModule)],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
