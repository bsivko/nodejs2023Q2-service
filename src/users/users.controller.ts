import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isUUID } from '../utils/uuid';
import { User, UserResponse } from './entities/user.entity';
import { Logger } from '@nestjs/common';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): string {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): UserResponse[] {
    const all = this.usersService.findAll();
    let result = [];
    all.forEach(element => {
      result.push(new UserResponse(element));
    });
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string): UserResponse {
    if (!isUUID(id)) {
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);
    }
    const result = this.usersService.findOne(id);
    if (result === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return new UserResponse(result);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
