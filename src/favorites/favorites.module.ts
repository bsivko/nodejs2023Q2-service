import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from 'src/tracks/entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Album, Artist])],
  controllers: [FavoritesController],
  providers: [FavoritesService, TracksService, AlbumsService, ArtistsService],
})
export class FavoritesModule {}
