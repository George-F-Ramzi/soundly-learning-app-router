import { db } from "@/db/db";
import { Artists, Songs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  let url = req.url;
  let index = url.indexOf("artist");
  let id = Number(url.slice(index + 7));

  try {
    let artist = await db
      .select({
        id: Artists.id,
        name: Artists.name,
        followers: Artists.followers,
        following: Artists.follwoing,
        songs: Artists.songs,
        cover: Artists.cover,
      })
      .from(Artists)
      .where(eq(Artists.id, id));

    if (artist.length === 0) {
      return new Response("Artist Doesn't Exist", { status: 400 });
    }

    let songs = await db
      .select({
        id: Songs.id,
        username: Artists.name,
        cover: Songs.cover,
        song: Songs.song,
        likes: Songs.likes,
        name: Songs.name,
        artist: Songs.artist,
      })
      .from(Songs)
      .where(eq(Songs.artist, id))
      .leftJoin(Artists, eq(Artists.id, id));

    return NextResponse.json({ info: artist[0], songs: songs });
  } catch (error) {
    return new Response("Something Wrong Happen", { status: 400 });
  }
}
