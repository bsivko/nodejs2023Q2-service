import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto extends PartialType(CreateArtistDto) { }

export class ReplaceArtistDto {
    @ApiProperty({ type: 'string' })
    @IsString()
    name: string;
    @ApiProperty({ type: 'boolean' })
    @IsBoolean()
    grammy: boolean;
}