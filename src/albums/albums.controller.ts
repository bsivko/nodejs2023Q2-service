import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, HttpException, Put } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ReplaceAlbumDto, UpdateAlbumDto } from './dto/update-album.dto';
import { isUUID } from 'class-validator';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    const result = this.albumsService.findOne(id);
    if (result === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return result;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() replaceAlbumDto: ReplaceAlbumDto) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.albumsService.replace(id, replaceAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.albumsService.remove(id);
  }
}
