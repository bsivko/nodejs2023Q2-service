import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) { }

export class ReplaceAlbumDto {
    @IsString()
    @ApiProperty({ type: 'string' })
    name: string;
    @IsNumber()
    @ApiProperty({ type: 'integer' })
    year: number;
    @ApiProperty({ type: 'string' })
    artistId: string | null;
}
