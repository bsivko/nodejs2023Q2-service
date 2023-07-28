import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, HttpException, Put } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ReplaceArtistDto, UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { isUUID } from 'class-validator';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll(): Artist[] {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Artist {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    const result = this.artistsService.findOne(id);
    if (result === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return result;
  }

  @Put(':id')
  replace(@Param('id') id: string, @Body() replaceDto: ReplaceArtistDto) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.artistsService.replace(id, replaceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): string {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.artistsService.remove(id);
  }
}
