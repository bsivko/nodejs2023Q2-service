import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ReplaceArtistDto, UpdateArtistDto } from './dto/update-artist.dto';
import { Artist, replaceArtist } from './entities/artist.entity';
import * as crypto from 'crypto';

@Injectable()
export class ArtistsService {

  private static artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto) {
    const id = crypto.randomUUID();
    ArtistsService.artists.push({
      ...createArtistDto,
      id: id
    });
    return `Added a new artist ${createArtistDto.name} : ${id}`;
  }

  findAll(): Artist[] {
    return ArtistsService.artists;
  }

  findOne(id: string): Artist {
    return ArtistsService.artists.find((p) => p.id === id);
  }

  replace(id: string, replaceArtistDto: ReplaceArtistDto) {
    let o = ArtistsService.artists.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    replaceArtist(o, replaceArtistDto);

    return `Artist #${id} had been replaced.`;
  }

  remove(id: string) {
    let o = ArtistsService.artists.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    ArtistsService.artists = ArtistsService.artists.filter(function (item) {
      return item.id !== id
    })

    return `Artist #${id} had been deleted.`;
  }
}
