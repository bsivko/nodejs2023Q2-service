import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', example: '"Its my life"' })
  name: string;
  @ApiProperty({ type: 'string' })
  artistId: string | null;
  albumId: string | null;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'integer', example: 243 })
  duration: number;
}
