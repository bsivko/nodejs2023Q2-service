import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ReplaceAlbumDto, UpdateAlbumDto } from './dto/update-album.dto';
import { Album, replaceAlbum } from './entities/album.entity';
import * as crypto from 'crypto';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto) {
    this.albums.push({
      ...createAlbumDto,
      id: crypto.randomUUID()
    });
    return `Added a new album ${createAlbumDto.name}`;
  }

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    return this.albums.find((p) => p.id === id);
  }

  replace(id: string, replaceDto: ReplaceAlbumDto) {
    let o = this.albums.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    replaceAlbum(o, replaceDto);

    return `Album #${id} had been replaced.`;
  }

  remove(id: string) {
    let o = this.albums.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    this.albums = this.albums.filter(function (item) {
      return item.id !== id
    })

    return `Artist #${id} had been deleted.`;
  }
}
