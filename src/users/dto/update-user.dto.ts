import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class UpdatePasswordDto {
    @IsNotEmpty()
    oldPassword: string; // previous password
    @IsNotEmpty()
    newPassword: string; // new password
}