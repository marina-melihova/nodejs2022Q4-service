import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryDBStorage } from './../../store/in-memory.db.storage';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private db: InMemoryDBStorage) {}

  create(dto: CreateUserDto) {
    const currentDate = Date.now();
    const newUser = new User({
      id: uuidv4(),
      ...dto,
      version: 1,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    this.db.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.db.users;
  }

  findOneById(id: string): User | null {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) return null;
    return user;
  }

  update(id: string, dto: UpdatePasswordDto): User | null {
    const idx = this.db.users.findIndex((user) => user.id === id);
    if (idx === -1) return null;

    const user = this.db.users[idx];
    if (user.password !== dto.oldPassword)
      throw new Error('Old Password is wrong');

    const updatedUser = new User({
      ...user,
      password: dto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });

    this.db.users.splice(idx, 1, updatedUser);
    return updatedUser;
  }

  delete(id: string): boolean {
    const idx = this.db.users.findIndex((user) => user.id === id);
    if (idx === -1) {
      return false;
    }
    this.db.users.splice(idx, 1);
    return true;
  }
}
