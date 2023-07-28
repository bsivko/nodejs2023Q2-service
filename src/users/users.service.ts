import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {

  private users: User[] = [];

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
    return o;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    let o = this.users.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    if (updatePasswordDto.oldPassword !== o.password)
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);

    o.version++;
    o.updatedAt = Date.now();

    return o;
  }

  remove(id: string) {
    let o = this.users.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);



    this.users = this.users.filter(function (item) {
      return item.id !== id
    })

    return `User #${id} had been deleted.`;
  }
}
