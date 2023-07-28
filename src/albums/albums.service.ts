import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ReplaceAlbumDto, UpdateAlbumDto } from './dto/update-album.dto';
import { Album, replaceAlbum } from './entities/album.entity';
import * as crypto from 'crypto';

@Injectable()
export class AlbumsService {
  private static albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto) {
    const id = crypto.randomUUID();
    AlbumsService.albums.push({
      ...createAlbumDto,
      id: id
    });
    return `Added a new album ${createAlbumDto.name} : ${id}`;
  }

  findAll(): Album[] {
    return AlbumsService.albums;
  }

  findOne(id: string): Album {
    return AlbumsService.albums.find((p) => p.id === id);
  }

  replace(id: string, replaceDto: ReplaceAlbumDto) {
    let o = AlbumsService.albums.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    replaceAlbum(o, replaceDto);

    return `Album #${id} had been replaced.`;
  }

  remove(id: string) {
    let o = AlbumsService.albums.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    AlbumsService.albums = AlbumsService.albums.filter(function (item) {
      return item.id !== id
    })

    return `Artist #${id} had been deleted.`;
  }
}
