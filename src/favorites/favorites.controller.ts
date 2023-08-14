import {
  Controller,
  Get,
  Post,
  Param,
  HttpException,
  HttpStatus,
  HttpCode,
  Delete,
  Header,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { isUUID } from 'class-validator';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoriteResponseDto } from './dto/get-favorites.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @Header('content-type', 'application/json')
  @ApiOkResponse({ description: 'All founded.' })
  findAll(): FavoriteResponseDto {
    return this.favoritesService.findAll();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Added fav track.' })
  @ApiNotFoundResponse({ description: 'Track not found.' })
  @ApiBadRequestResponse({ description: 'UUID is incorrect.' })
  @ApiUnprocessableEntityResponse({ description: 'Track already in favs.' })
  @Header('content-type', 'application/json')
  addTrack(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    this.favoritesService.addTrack(id);

    return TracksService.findOne(id);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('content-type', 'application/json')
  @ApiBadRequestResponse({ description: 'UUID is incorrect.' })
  @ApiNotFoundResponse({ description: 'Album not found.' })
  @ApiCreatedResponse({ description: 'Added fav album.' })
  @ApiUnprocessableEntityResponse({ description: 'Album already in favs.' })
  addAlbum(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.favoritesService.addAlbum(id);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('content-type', 'application/json')
  @ApiCreatedResponse({ description: 'Added fav artist.' })
  @ApiBadRequestResponse({ description: 'UUID is incorrect.' })
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  @ApiUnprocessableEntityResponse({ description: 'Artist already in favs.' })
  addArtist(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.favoritesService.addArtist(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('content-type', 'application/json')
  @ApiBadRequestResponse({ description: 'UUID is incorrect.' })
  @ApiNotFoundResponse({ description: 'Track not found.' })
  @ApiNoContentResponse({ description: 'Track removed from favs.' })
  removeTrack(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.favoritesService.removeTrack(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('content-type', 'application/json')
  @ApiBadRequestResponse({ description: 'UUID is incorrect.' })
  @ApiNotFoundResponse({ description: 'Album not found.' })
  @ApiNoContentResponse({ description: 'Album removed from favs.' })
  removeAlbum(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.favoritesService.removeAlbum(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('content-type', 'application/json')
  @ApiBadRequestResponse({ description: 'UUID is incorrect.' })
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  @ApiNoContentResponse({ description: 'Artist removed from favs.' })
  removeArtist(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.favoritesService.removeArtist(id);
  }
}
