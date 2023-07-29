import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class Favorite {
    @ApiProperty({ type: 'array' })
    @IsArray()
    artists: string[] = []; // favorite artists ids
    @ApiProperty({ type: 'array' })
    @IsArray()
    albums: string[] = []; // favorite albums ids
    @ApiProperty({ type: 'array' })
    @IsArray()
    tracks: string[] = []; // favorite tracks ids
}
