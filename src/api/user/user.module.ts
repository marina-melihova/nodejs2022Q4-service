import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryDBStorage } from './../../store/in-memory.db.storage';

@Module({
  providers: [InMemoryDBStorage, UserService],
  controllers: [UserController],
})
export class UserModule {}
