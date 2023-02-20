import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    await this.isLoginExists(dto.login);
    const newUser = this.userRepository.create(dto);
    return await this.userRepository.save(newUser);
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

    if (user.password !== dto.oldPassword)
      throw new ForbiddenException('Old Password is wrong');

    await this.userRepository.update(id, { password: dto.newPassword });

    return this.findOneById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected !== 0;
  }

  async isLoginExists(login: string) {
    const user = await this.findOneByLogin(login);
    if (user) {
      throw new BadRequestException(`User with login=${login} already exists`);
    }
  }
}
