import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Track, Artist])],
  controllers: [AlbumsController],
  providers: [AlbumsService, FavoritesService, TracksService, ArtistsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
