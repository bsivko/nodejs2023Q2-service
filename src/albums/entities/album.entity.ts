import { ApiProperty } from '@nestjs/swagger';
import { ReplaceAlbumDto } from '../dto/update-album.dto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: 'string',
    example: '"fc638392-c772-46f4-ab7c-c33abe03d718"',
  })
  id: string; // uuid v4

  @Column()
  @ApiProperty({ type: 'string', example: '"Moscow Calling!"' })
  name: string;

  @Column()
  @ApiProperty({ type: 'integer', example: 1991 })
  year: number;

  @Column({ nullable: true })
  @ApiProperty({
    type: 'string',
    example: '"ab636281-9f4b-4beb-b473-ada356601f75"',
  })
  artistId: string | null; // refers to Artist
}

export function replaceAlbum(o: Album, r: ReplaceAlbumDto) {
  if (r.hasOwnProperty('name')) o.name = r.name;

  if (r.hasOwnProperty('year')) o.year = r.year;

  if (r.hasOwnProperty('artistId')) o.artistId = r.artistId;
}
