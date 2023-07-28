import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavoritesService } from 'src/favorites/favorites.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, FavoritesService, AlbumsService, ArtistsService]
})
export class TracksModule { }
