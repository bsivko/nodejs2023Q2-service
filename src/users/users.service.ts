import { Injectable } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {

  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const now = Date.now();
    this.users.push({
      ...createUserDto,
      id: crypto.randomUUID(),
      version: 1,
      createdAt: now,
      updatedAt: now,
    });
    return `Added a new user ${createUserDto.login}`;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const o = this.users.find((p) => p.id === id);
    console.log(o);
    return o;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
