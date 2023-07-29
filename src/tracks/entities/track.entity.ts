import { ApiProperty } from '@nestjs/swagger';
import { ReplaceTrackDto } from '../dto/update-track.dto';

export class Track {
  @ApiProperty({
    type: 'string',
    example: '"fc638392-c772-46f4-ab7c-c33abe03d718"',
  })
  id: string; // uuid v4
  @ApiProperty({ type: 'string', example: '"Final Countdown"' })
  name: string;
  @ApiProperty({
    type: 'string',
    example: '"fba5d40d-f56d-4999-aa13-2fe683f87547"',
  })
  artistId: string | null; // refers to Artist
  @ApiProperty({
    type: 'string',
    example: '"ab636281-9f4b-4beb-b473-ada356601f75"',
  })
  albumId: string | null; // refers to Album
  @ApiProperty({ type: 'string', example: 131 })
  duration: number; // integer number
}

export function replaceTrack(o: Track, r: ReplaceTrackDto) {
  if (r.hasOwnProperty('name')) o.name = r.name;

  if (r.hasOwnProperty('artistId')) o.artistId = r.artistId;

  if (r.hasOwnProperty('albumId')) o.albumId = r.albumId;

  if (r.hasOwnProperty('duration')) o.duration = r.duration;
}
