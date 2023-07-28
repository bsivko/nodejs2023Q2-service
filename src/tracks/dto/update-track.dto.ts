import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) { }

export class ReplaceTrackDto {
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
}