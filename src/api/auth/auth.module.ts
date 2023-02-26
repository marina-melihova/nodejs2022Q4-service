import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessStrategy } from './strategies/access.strategy';
import { UserModule } from '..';

@Module({
  imports: [JwtModule.register({}), forwardRef(() => UserModule)],
  providers: [AuthService, AccessStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
