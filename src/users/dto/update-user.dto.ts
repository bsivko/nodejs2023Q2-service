import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class UpdatePasswordDto {
    @IsNotEmpty()
    @IsString()
    oldPassword: string; // previous password
    @IsNotEmpty()
    @IsString()
    newPassword: string; // new password
}