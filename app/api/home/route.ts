import { artists, songs } from "@/utils/db";
import { NextResponse } from "next/server";
import { IArtist, ISong } from "@/utils/types";

export async function GET() {
  let popular: IArtist[] = artists.chain().find().limit(9).data();
  popular.forEach((a) => {
    //@ts-ignore
    delete a.password;
    //@ts-ignore
    delete a.email;
    //@ts-ignore
    delete a.meta;
    //@ts-ignore
    delete a["$loki"];
  });

  let discover: ISong[] = songs.chain().find().limit(9).data();

  let songs_id = discover.map((s) => s.id);
  let songs_artists: IArtist[] = artists.find({ id: { $in: songs_id } });

  discover.forEach((s: any) => {
    for (let index = 0; index < songs_artists.length; index++) {
      if (s.artist === songs_artists[index].id)
        s.artist = {
          id: songs_artists[index].id,
          photo: songs_artists[index].photo,
          username: songs_artists[index].username,
        };
    }

    //@ts-ignore
    delete s.meta;
    //@ts-ignore
    delete s["$loki"];
  });

  return NextResponse.json({ discover, popular });
}
