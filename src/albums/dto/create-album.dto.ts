import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    description: "Album's name",
    example: 'Ejik v tumane',
  })
  name: string;
  @IsNumber()
  @ApiProperty({ type: 'integer', example: '1965' })
  year: number;
  @ApiProperty({ type: 'string', description: 'ID of artist in Artist table.' })
  artistId: string | null; // refers to Artist
}
