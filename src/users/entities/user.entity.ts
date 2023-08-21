import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

Entity();
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number; // integer number, increments on update

  @Column()
  createdAt: number; // timestamp of creation

  @Column()
  updatedAt: number; // timestamp of last update
}

export class UserResponse {
  @ApiProperty({ type: 'string' })
  id: string;
  @ApiProperty({ type: 'string' })
  login: string;
  @ApiProperty({ type: 'integer' })
  version: number;
  @ApiProperty({ type: 'integer' })
  createdAt: number;
  @ApiProperty({ type: 'integer' })
  updatedAt: number;

  constructor(o: User) {
    this.id = o.id;
    this.login = o.login;
    this.version = o.version;
    this.createdAt = o.createdAt;
    this.updatedAt = o.updatedAt;
  }
}
