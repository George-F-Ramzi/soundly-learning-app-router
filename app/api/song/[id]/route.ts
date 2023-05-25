import { db } from "@/db/db";
import { Artists, Comments, Songs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  let url = req.url;
  let index = url.indexOf("song");
  let id = Number(url.slice(index + 5));

  try {
    let song = await db
      .select({
        id: Songs.name,
        username: Artists.name,
        cover: Songs.cover,
        song: Songs.song,
        likes: Songs.likes,
        name: Songs.name,
        artist: Songs.artist,
      })
      .from(Songs)
      .where(eq(Songs.id, id))
      .leftJoin(Artists, eq(Artists.id, id));

    if (song.length === 0) {
      return new Response("song didnt exist", { status: 400 });
    }

    let comments = await db
      .select({
        id: Comments.id,
        song: Comments.song,
        artist: Comments.artist,
        details: Comments.details,
        name: Artists.name,
        cover: Artists.cover,
      })
      .from(Comments)
      .where(eq(Comments.song, id))
      .leftJoin(Artists, eq(Comments.artist, Artists.id));

    return NextResponse.json({ info: song[0], comments });
  } catch (error) {
    return new Response("Something Wrong Happen", { status: 400 });
  }
}
