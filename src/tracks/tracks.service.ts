import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

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

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
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
