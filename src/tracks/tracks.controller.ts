import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, HttpException, Put, Header } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ReplaceTrackDto, UpdateTrackDto } from './dto/update-track.dto';
import { isUUID } from 'class-validator';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Track } from './entities/track.entity';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header("content-type", "application/json")
  @ApiBadRequestResponse({ description: 'Body is incorrect.' })
  @ApiCreatedResponse({ type: Track, description: 'Track created.' })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  @Header("content-type", "application/json")
  @ApiOkResponse({ description: 'All founded.' })
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @Header("content-type", "application/json")
  @ApiBadRequestResponse({ description: 'UUID is incorrect.' })
  @ApiNotFoundResponse({ description: 'Track not found.' })
  @ApiOkResponse({ type: Track, description: 'Track found.' })
  findOne(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    const result = TracksService.findOne(id);
    if (result === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return result;
  }

  @Put(':id')
  @Header("content-type", "application/json")
  @ApiBadRequestResponse({ description: 'UUID is incorrect.' })
  @ApiNotFoundResponse({ description: 'Track not found.' })
  @ApiOkResponse({ type: Track, description: 'Track changed.' })
  replace(@Param('id') id: string, @Body() replaceTrackDto: ReplaceTrackDto) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.tracksService.replace(id, replaceTrackDto);
  }

  @Delete(':id')
  @Header("content-type", "application/json")
  @ApiBadRequestResponse({ description: 'UUID is incorrect.' })
  @ApiNotFoundResponse({ description: 'Track not found.' })
  @ApiNoContentResponse({ description: 'Track deleted.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('ID is not UUID', HttpStatus.BAD_REQUEST);

    return this.tracksService.remove(id);
  }
}
