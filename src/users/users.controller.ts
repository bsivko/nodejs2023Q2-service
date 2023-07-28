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
  Put,
  Header,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { isUUID } from '../utils/uuid';
import { UserResponse } from './entities/user.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header("content-type", "application/json")
  create(@Body() createUserDto: CreateUserDto) {
    return new UserResponse(this.usersService.create(createUserDto));
  }

  @Get()
  @Header("content-type", "application/json")
  findAll(): UserResponse[] {
    const all = this.usersService.findAll();
    let result = [];
    all.forEach(element => {
      result.push(new UserResponse(element));
    });
    return result;
  }

  @Get(':id')
  @Header("content-type", "application/json")
  findOne(@Param('id') id: string): UserResponse {
    if (!isUUID(id)) {
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);
    }
    const result = this.usersService.findOne(id);
    if (result === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return new UserResponse(result);
  }

  @Put(':id')
  @Header("content-type", "application/json")
  update(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    const result = this.usersService.updatePassword(id, updatePasswordDto);
    if (result === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return new UserResponse(result);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @Header("content-type", "application/json")
  remove(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.usersService.remove(id);
  }
}
