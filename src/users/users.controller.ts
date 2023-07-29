import {
  Controller,
  Get,
  Post,
  Body,
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
import { UpdatePasswordDto } from './dto/update-user.dto';
import { isUUID } from '../utils/uuid';
import { UserResponse } from './entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('content-type', 'application/json')
  @ApiBadRequestResponse({ description: 'Body is incorrect.' })
  @ApiCreatedResponse({
    type: UserResponse,
    description: 'The record has been successfully created.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return new UserResponse(this.usersService.create(createUserDto));
  }

  @Get()
  @Header('content-type', 'application/json')
  @ApiOkResponse({ description: 'All founded.' })
  findAll(): UserResponse[] {
    const all = this.usersService.findAll();
    const result = [];
    all.forEach((element) => {
      result.push(new UserResponse(element));
    });
    return result;
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  @ApiOkResponse({
    type: UserResponse,
    description: 'Get successfully proceed.',
  })
  @ApiBadRequestResponse({ description: 'UUID is incorrect.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
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
  @Header('content-type', 'application/json')
  @ApiBadRequestResponse({ description: 'UUID is incorrect.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiOkResponse({ type: UserResponse, description: 'User password updated.' })
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    const result = this.usersService.updatePassword(id, updatePasswordDto);
    if (result === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return new UserResponse(result);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @Header('content-type', 'application/json')
  @ApiBadRequestResponse({ description: 'UUID is incorrect.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiNoContentResponse({ description: 'User deleted.' })
  remove(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.usersService.remove(id);
  }
}
