import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export interface CreateArtistDtoI {
    name: string;
    grammy: boolean;
}

export class CreateArtistDto implements CreateArtistDtoI {
    @ApiProperty({ type: 'string' })
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({ type: 'boolean' })
    @IsNotEmpty()
    @IsBoolean()
    grammy: boolean;
}
