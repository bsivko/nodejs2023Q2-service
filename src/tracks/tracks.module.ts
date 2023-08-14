import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavoritesService } from 'src/favorites/favorites.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Module({
  controllers: [TracksController],
  imports: [TypeOrmModule.forFeature([Track, Album, Artist])],
  providers: [TracksService, FavoritesService, AlbumsService, ArtistsService],
  exports: [TracksService],
})
export class TracksModule {}
