import { db } from "@/db/db";
import { Artists, Songs } from "@/db/schema";
import { eq, ilike } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let url = req.url;
  let index = url.indexOf("search");
  let value = url.slice(index + 7);

  try {
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
      .where(ilike(Songs.name, `%${value}%`))
      .leftJoin(Artists, eq(Artists.id, Songs.artist));

    let artists = await db
      .select({
        id: Artists.id,
        name: Artists.name,
        followers: Artists.followers,
        following: Artists.follwoing,
        songs: Artists.songs,
        cover: Artists.cover,
      })
      .from(Artists)
      .where(ilike(Artists.name, `${value}%`));

    return NextResponse.json({ artists, songs });
  } catch (error) {
    return new Response("Something Wrong Happen", { status: 400 });
  }
}
