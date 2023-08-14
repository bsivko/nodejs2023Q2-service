import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Track, Album, Favorite])],
  controllers: [ArtistsController],
  providers: [ArtistsService, FavoritesService, TracksService, AlbumsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
