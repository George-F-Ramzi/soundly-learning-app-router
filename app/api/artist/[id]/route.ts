import { artists, songs } from "@/utils/db";
import { NextResponse } from "next/server";
import { IArtist, ISong } from "@/utils/types";

export async function GET(req: Request) {
  let url = req.url;
  let index = url.indexOf("artist");
  let id = url.slice(index + 7);

  let artist: IArtist = artists.findOne({ id: Number(id) });

  let uploaded: ISong[] = songs.find({ artist: Number(id) });

  uploaded.forEach((s) => {
    s.artist = {
      id: artist.id,
      photo: artist.photo,
      username: artist.username,
    };
    //@ts-ignore
    delete s.meta;
    //@ts-ignore
    delete s["$loki"];
  });

  //@ts-ignore
  delete artist.password;
  //@ts-ignore
  delete artist.email;
  //@ts-ignore
  delete artist.meta;
  //@ts-ignore
  delete artist["$loki"];

  return NextResponse.json({ info: artist, songs: uploaded });
}
