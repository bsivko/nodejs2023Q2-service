import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  login: string;
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
