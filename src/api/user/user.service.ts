import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entity/user.entity';
import config from '../../config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash(dto.password, config.salt);
    const newUser = this.userRepository.create({ ...dto, password });
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    return user ?? null;
  }

  async findOneByLogin(login: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ login });
    return user ?? null;
  }

  async update(id: string, dto: UpdatePasswordDto): Promise<User | null> {
    const user = await this.findOneById(id);
    if (!user) return null;

    const isPasswordMatch = await bcrypt.compare(
      dto.oldPassword,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new ForbiddenException('Old password is wrong');
    }

    const newPassword = await bcrypt.hash(dto.newPassword, config.salt);
    await this.userRepository.update(id, { password: newPassword });
    return this.findOneById(id);
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException('User not found');
    }
  }
}
