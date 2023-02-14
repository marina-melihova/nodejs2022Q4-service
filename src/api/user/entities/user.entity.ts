import { Exclude } from 'class-transformer';
import {
  Column,
  ColumnOptions,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { IUser } from '../interfaces/user.interface';

const dateColumnsOptions = {
  type: 'timestamp',
  transformer: {
    from: (value: Date) => Date.parse(value.toISOString()),
    to: (value) => value,
  },
} as ColumnOptions;

@Entity('user')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn(dateColumnsOptions)
  createdAt: number;

  @UpdateDateColumn(dateColumnsOptions)
  updatedAt: number;
}
