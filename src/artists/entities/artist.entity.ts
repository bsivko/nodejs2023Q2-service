import { IsBoolean, IsString } from "class-validator";
import { ReplaceArtistDto } from "../dto/update-artist.dto";

export class Artist {
    @IsString()
    id: string; // uuid v4
    @IsString()
    name: string;
    @IsBoolean()
    grammy: boolean;
}

export function replaceArtist(o: Artist, r: ReplaceArtistDto) {
    if (r.hasOwnProperty("name"))
        o.name = r.name;

    if (r.hasOwnProperty("grammy"))
        o.grammy = r.grammy;
}
