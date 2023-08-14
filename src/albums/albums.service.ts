import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ReplaceAlbumDto } from './dto/update-album.dto';
import { Album, replaceAlbum } from './entities/album.entity';
import * as crypto from 'crypto';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlbumsService {
  private static albums: Album[] = [];

  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    const o = {
      ...createAlbumDto,
      id: crypto.randomUUID(),
    };
    AlbumsService.albums.push(o);
    return o;
  }

  findAll(): Album[] {
    return AlbumsService.albums;
  }

  findOne(id: string): Album {
    return AlbumsService.albums.find((p) => p.id === id);
  }

  replace(id: string, replaceDto: ReplaceAlbumDto) {
    const o = AlbumsService.albums.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    replaceAlbum(o, replaceDto);

    return o;
  }

  remove(id: string) {
    const o = AlbumsService.albums.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    FavoritesService.removeAlbumIfExist(id);
    TracksService.removeAlumId(id);

    AlbumsService.albums = AlbumsService.albums.filter(function (item) {
      return item.id !== id;
    });

    return `Artist #${id} had been deleted.`;
  }

  static removeArtistId(id: string) {
    AlbumsService.albums.forEach((o) => {
      if (o.artistId === id) o.artistId = null;
    });
  }
}
