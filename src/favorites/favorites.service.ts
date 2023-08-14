import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistsService } from 'src/artists/artists.service';
import { FavoriteResponseDto } from './dto/get-favorites.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FavoritesService {
  private static favorites: Favorite = new Favorite();
  @Inject(TracksService)
  private readonly tracksService: TracksService;
  @Inject(AlbumsService)
  private readonly albumsService: AlbumsService;
  @Inject(ArtistsService)
  private readonly artistsService: ArtistsService;

  removeTrack(id: string) {
    const o = FavoritesService.favorites.tracks.find((p) => p === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    FavoritesService.favorites.tracks =
      FavoritesService.favorites.tracks.filter(function (item) {
        return item !== id;
      });
  }

  removeAlbum(id: string) {
    const o = FavoritesService.favorites.albums.find((p) => p === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    FavoritesService.favorites.albums =
      FavoritesService.favorites.albums.filter(function (item) {
        return item !== id && item !== null;
      });
  }

  static removeAlbumIfExist(id: string) {
    const o = FavoritesService.favorites.albums.find((p) => p === id);
    if (o === undefined) return;

    FavoritesService.favorites.albums =
      FavoritesService.favorites.albums.filter(function (item) {
        return item !== id && item !== null;
      });
  }

  removeArtist(id: string) {
    const o = FavoritesService.favorites.artists.find((p) => p === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    FavoritesService.favorites.artists =
      FavoritesService.favorites.artists.filter(function (item) {
        return item !== id && item !== null;
      });
  }

  addTrack(id: string) {
    if (TracksService.findOne(id) === undefined) {
      throw new HttpException(
        'Track is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const o = FavoritesService.favorites.tracks.find((p) => p === id);
    if (o !== undefined)
      throw new HttpException(
        'Track is already in favorites',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    FavoritesService.favorites.tracks.push(id);
  }

  addArtist(id: string) {
    if (this.artistsService.findOne(id) === undefined) {
      throw new HttpException(
        'Artist is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const o = FavoritesService.favorites.artists.find((p) => p === id);
    if (o !== undefined)
      throw new HttpException(
        'Track is already in artists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    FavoritesService.favorites.artists.push(id);
  }

  addAlbum(id: string) {
    if (this.albumsService.findOne(id) === undefined) {
      throw new HttpException(
        'Album is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const o = FavoritesService.favorites.albums.find((p) => p === id);
    if (o !== undefined)
      throw new HttpException(
        'Track is already in albums',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    FavoritesService.favorites.albums.push(id);
  }

  findAll(): FavoriteResponseDto {
    const result = new FavoriteResponseDto();

    FavoritesService.favorites.albums.forEach((o) => {
      const x = this.albumsService.findOne(o);
      if (x !== null && x !== undefined) result.albums.push(x);
    });

    result.artists = [];
    FavoritesService.favorites.artists.forEach((o) => {
      const x = this.artistsService.findOne(o);
      if (x !== null && x !== undefined) result.artists.push(x);
    });

    result.tracks = [];
    FavoritesService.favorites.tracks.forEach((o) => {
      const x = TracksService.findOne(o);
      if (x !== null && x !== undefined) result.tracks.push(x);
    });

    return result;
  }
}
