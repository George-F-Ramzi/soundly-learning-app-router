import { artists, songs } from "@/utils/db";
import { NextResponse } from "next/server";
import { IArtist, ISong } from "@/utils/types";

export async function GET(req: Request) {
  let url = req.url;
  let index = url.indexOf("song");
  let id = url.slice(index + 5);

  let song: ISong = songs.findOne({ id: Number(id) });

  if (!song) return new Response("song didnt exist", { status: 400 });

  let artist: IArtist = artists.findOne({ id: song.artist });

  song.artist = {
    id: artist.id,
    photo: artist.photo,
    username: artist.username,
  };

  //@ts-ignore
  delete song.meta;
  //@ts-ignore
  delete song["$loki"];

  return NextResponse.json(song);
}
