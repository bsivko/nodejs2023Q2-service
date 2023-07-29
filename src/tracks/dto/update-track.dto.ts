import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto extends PartialType(CreateTrackDto) { }

export class ReplaceTrackDto {
    @IsString()
    @ApiProperty({ type: 'string' })
    name: string;
    @ApiProperty({ type: 'string' })
    artistId: string | null;
    @ApiProperty({ type: 'string' })
    albumId: string | null;
    @IsNumber()
    @ApiProperty({ type: 'integer' })
    duration: number;
}