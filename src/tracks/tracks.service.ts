import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { ReplaceTrackDto } from './dto/update-track.dto';
import { Track, replaceTrack } from './entities/track.entity';
import * as crypto from 'crypto';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto) {
    this.tracks.push({
      ...createTrackDto,
      id: crypto.randomUUID()
    });
    return `Added a new track ${createTrackDto.name}`;
  }

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    return this.tracks.find((p) => p.id === id);
  }

  replace(id: string, replaceTrackDto: ReplaceTrackDto) {
    let o = this.tracks.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    replaceTrack(o, replaceTrackDto);

    return `Track #${id} had been replaced.`;
  }

  remove(id: string) {
    let o = this.tracks.find((p) => p.id === id);
    if (o === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    this.tracks = this.tracks.filter(function (item) {
      return item.id !== id
    })

    return `Track #${id} had been deleted.`;
  }
}
