import { ReplaceAlbumDto } from "../dto/update-album.dto";

export class Album {
    id: string; // uuid v4
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
}

export function replaceAlbum(o: Album, r: ReplaceAlbumDto) {
    if (r.hasOwnProperty("name"))
        o.name = r.name;

    if (r.hasOwnProperty("year"))
        o.year = r.year;

    if (r.hasOwnProperty("artistId"))
        o.artistId = r.artistId;
}