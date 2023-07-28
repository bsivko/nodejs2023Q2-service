import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { ReplaceTrackDto } from './dto/update-track.dto';
import { Track, replaceTrack } from './entities/track.entity';
import * as crypto from 'crypto';

@Injectable()
export class TracksService {
  private static tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto) {
    const id = crypto.randomUUID();
    TracksService.tracks.push({
      ...createTrackDto,
      id: id
    });
    return `Added a new track ${createTrackDto.name} ${id}`;
  }

  findAll(): Track[] {
    return TracksService.tracks;
  }

  findOne(id: string): Track {
    return TracksService.tracks.find((p) => p.id === id);
  }

  replace(id: string, replaceTrackDto: ReplaceTrackDto) {
    let o = TracksService.tracks.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    replaceTrack(o, replaceTrackDto);

    return `Track #${id} had been replaced.`;
  }

  remove(id: string) {
    let o = TracksService.tracks.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    TracksService.tracks = TracksService.tracks.filter(function (item) {
      return item.id !== id
    })

    return `Track #${id} had been deleted.`;
  }
}
