import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';

export class FavoriteResponseDto {
  @ApiProperty({ type: 'array' })
  artists: Artist[] = [];
  @ApiProperty({ type: 'array' })
  albums: Album[] = [];
  @ApiProperty({ type: 'array' })
  tracks: Track[] = [];
}
