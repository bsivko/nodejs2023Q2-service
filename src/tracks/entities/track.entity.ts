import { ReplaceTrackDto } from "../dto/update-track.dto";

export class Track {

    id: string; // uuid v4
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
}

export function replaceTrack(o: Track, r: ReplaceTrackDto) {
    if (r.hasOwnProperty("name"))
        o.name = r.name;

    if (r.hasOwnProperty("artistId"))
        o.artistId = r.artistId;

    if (r.hasOwnProperty("albumId"))
        o.albumId = r.albumId;

    if (r.hasOwnProperty("duration"))
        o.duration = r.duration;
}
