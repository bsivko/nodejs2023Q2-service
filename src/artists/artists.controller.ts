import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  Put,
  Header,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ReplaceArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { isUUID } from 'class-validator';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Artist, description: 'Created artist.' })
  @ApiBadRequestResponse({ description: 'Body is incorrect.' })
  @Header('content-type', 'application/json')
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @Header('content-type', 'application/json')
  @ApiOkResponse({ description: 'All founded.' })
  findAll(): Artist[] {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  @ApiBadRequestResponse({ description: 'UUID is incorrect.' })
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  @ApiOkResponse({ type: Artist, description: 'Artist found.' })
  findOne(@Param('id') id: string): Artist {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    const result = this.artistsService.findOne(id);
    if (result === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return result;
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  @ApiBadRequestResponse({ description: 'UUID is incorrect.' })
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  @ApiOkResponse({ description: 'Artist changed.' })
  replace(@Param('id') id: string, @Body() replaceDto: ReplaceArtistDto) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.artistsService.replace(id, replaceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse({ description: 'UUID is incorrect.' })
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  @ApiNoContentResponse({ description: 'Artist deleted.' })
  @Header('content-type', 'application/json')
  remove(@Param('id') id: string): string {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.artistsService.remove(id);
  }
}
