import { IsBoolean, IsString } from "class-validator";
import { ReplaceArtistDto } from "../dto/update-artist.dto";
import { ApiProperty } from "@nestjs/swagger";

export class Artist {
    @ApiProperty({ type: 'string', example: '"fc638392-c772-46f4-ab7c-c33abe03d718"' })
    @IsString()
    id: string; // uuid v4
    @ApiProperty({ type: 'string', example: '"Captain Jack"' })
    @IsString()
    name: string;
    @ApiProperty({ type: 'boolean', example: 'true' })
    @IsBoolean()
    grammy: boolean;
}

export function replaceArtist(o: Artist, r: ReplaceArtistDto) {
    if (r.hasOwnProperty("name"))
        o.name = r.name;

    if (r.hasOwnProperty("grammy"))
        o.grammy = r.grammy;
}
