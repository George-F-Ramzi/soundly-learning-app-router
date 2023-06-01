import { db } from "@/db/db";
import { Artists, Songs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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
      .limit(9);

    let discover = await db
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
      .leftJoin(Artists, eq(Artists.id, Songs.artist))
      .limit(9);
    return NextResponse.json({ popular: artists, discover });
  } catch (error) {
    return new Response("Something Wrong Happen", { status: 400 });
  }
}
