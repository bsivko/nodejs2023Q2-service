import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ReplaceArtistDto } from './dto/update-artist.dto';
import { Artist, replaceArtist } from './entities/artist.entity';
import * as crypto from 'crypto';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistsService {
  private static artists: Artist[] = [];

  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {
    console.log("ArtistsService c'tor");
  }

  create(createArtistDto: CreateArtistDto) {
    const o = {
      ...createArtistDto,
      id: crypto.randomUUID(),
    };
    ArtistsService.artists.push(o);
    console.log('Artist create');
    return o;
  }

  findAll(): Artist[] {
    console.log('Artist findAll');
    return ArtistsService.artists;
  }

  findOne(id: string): Artist {
    console.log('Artist findOne');
    return ArtistsService.artists.find((p) => p.id === id);
  }

  replace(id: string, replaceArtistDto: ReplaceArtistDto) {
    const o = ArtistsService.artists.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    replaceArtist(o, replaceArtistDto);

    return o;
  }

  remove(id: string) {
    const o = ArtistsService.artists.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    ArtistsService.artists = ArtistsService.artists.filter(function (item) {
      return item.id !== id;
    });

    AlbumsService.removeArtistId(id);
    TracksService.removeArtistId(id);

    return `Artist #${id} had been deleted.`;
  }
}
