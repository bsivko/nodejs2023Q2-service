import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class FavoritesService {

  private favorites: Favorite = new Favorite();
  @Inject(TracksService)
  private readonly tracksService: TracksService;
  @Inject(AlbumsService)
  private readonly albumsService: AlbumsService;
  @Inject(ArtistsService)
  private readonly artistsService: ArtistsService;

  removeTrack(id: string) {
    let o = this.favorites.tracks.find((p) => p === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    this.favorites.tracks = this.favorites.tracks.filter(function (item) {
      return item !== id
    })
  }

  removeAlbum(id: string) {
    let o = this.favorites.albums.find((p) => p === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    this.favorites.albums = this.favorites.albums.filter(function (item) {
      return item !== id
    })
  }

  removeArtist(id: string) {
    let o = this.favorites.artists.find((p) => p === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    this.favorites.artists = this.favorites.artists.filter(function (item) {
      return item !== id
    })
  }

  addTrack(id: string) {
    if (this.tracksService.findOne(id) === undefined) {
      throw new HttpException('Track is not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    let o = this.favorites.tracks.find((p) => p === id);
    if (o !== undefined)
      throw new HttpException('Track is already in favorites', HttpStatus.UNPROCESSABLE_ENTITY);

    this.favorites.tracks.push(id);
  }

  addArtist(id: string) {
    if (this.artistsService.findOne(id) === undefined) {
      throw new HttpException('Artist is not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    let o = this.favorites.artists.find((p) => p === id);
    if (o !== undefined)
      throw new HttpException('Track is already in artists', HttpStatus.UNPROCESSABLE_ENTITY);

    this.favorites.artists.push(id);
  }

  addAlbum(id: string) {
    if (this.albumsService.findOne(id) === undefined) {
      throw new HttpException('Album is not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    let o = this.favorites.albums.find((p) => p === id);
    if (o !== undefined)
      throw new HttpException('Track is already in albums', HttpStatus.UNPROCESSABLE_ENTITY);

    this.favorites.albums.push(id);
  }

  findAll(): Favorite {
    return this.favorites;
  }
}
