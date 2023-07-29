import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAlbumDto {
    @IsString()
    @ApiProperty({ type: 'string' })
    name: string;
    @IsNumber()
    @ApiProperty({ type: 'integer' })
    year: number;
    @ApiProperty({ type: 'string' })
    artistId: string | null; // refers to Artist 
}
