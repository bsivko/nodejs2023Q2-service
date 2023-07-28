import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ReplaceArtistDto, UpdateArtistDto } from './dto/update-artist.dto';
import { Artist, replaceArtist } from './entities/artist.entity';
import * as crypto from 'crypto';

@Injectable()
export class ArtistsService {

  private artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto) {
    this.artists.push({
      ...createArtistDto,
      id: crypto.randomUUID()
    });
    return `Added a new artist ${createArtistDto.name}`;
  }

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    return this.artists.find((p) => p.id === id);
  }

  replace(id: string, replaceArtistDto: ReplaceArtistDto) {
    let o = this.artists.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    replaceArtist(o, replaceArtistDto);

    return `Artist #${id} had been replaced.`;
  }

  remove(id: string) {
    let o = this.artists.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    this.artists = this.artists.filter(function (item) {
      return item.id !== id
    })

    return `Artist #${id} had been deleted.`;
  }
}
