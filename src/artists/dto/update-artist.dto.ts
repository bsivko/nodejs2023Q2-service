import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) { }

export class ReplaceArtistDto {
    name: string;
    grammy: boolean;
}