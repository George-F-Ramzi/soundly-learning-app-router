import { artists, likes, songs } from "@/utils/db";
import { NextResponse } from "next/server";
import { IArtist, ISong } from "@/utils/types";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;

  let liked = likes.find({ artist: id });
  let songs_id = liked.map((s) => s.song);
  let songs_data: ISong[] = songs.find({ id: { $in: songs_id } });

  let artists_id = songs_data.map((s) => s.artist);
  let artists_data: IArtist[] = artists.find({ id: { $in: artists_id } });

  songs_data.forEach((s: any) => {
    for (let index = 0; index < artists_data.length; index++) {
      if (s.artist === artists_data[index].id)
        s.artist = {
          id: artists_data[index].id,
          photo: artists_data[index].photo,
          username: artists_data[index].username,
        };
      //@ts-ignore
      delete s.meta;
      //@ts-ignore
      delete s["$loki"];
    }
  });

  return NextResponse.json(songs_data);
}
