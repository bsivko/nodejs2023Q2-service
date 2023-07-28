import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) { }

export class ReplaceTrackDto {
    @IsString()
    name: string;
    @IsString()
    artistId: string | null;
    @IsString()
    albumId: string | null;
    @IsNumber()
    duration: number;
}