import { Controller, Get, Post, Param, HttpException, HttpStatus, HttpCode, Delete, Header } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';
import { isUUID } from 'class-validator';
import { TracksService } from 'src/tracks/tracks.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Get()
  @Header("content-type", "application/json")
  findAll(): Favorite {
    return this.favoritesService.findAll();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header("content-type", "application/json")
  addTrack(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    this.favoritesService.addTrack(id);

    return TracksService.findOne(id);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header("content-type", "application/json")
  addAlbum(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.favoritesService.addAlbum(id);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header("content-type", "application/json")
  addArtist(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.favoritesService.addArtist(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header("content-type", "application/json")
  removeTrack(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.favoritesService.removeTrack(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header("content-type", "application/json")
  removeAlbum(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.favoritesService.removeAlbum(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header("content-type", "application/json")
  removeArtist(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.favoritesService.removeArtist(id);
  }
}
