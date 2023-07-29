import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdatePasswordDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  oldPassword: string; // previous password
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  newPassword: string; // new password
}
