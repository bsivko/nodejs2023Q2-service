import { IsOptional } from "class-validator";

export class CreateUserDto {
    @IsOptional
    login: string;
    @IsOptional
    password: string;
}
