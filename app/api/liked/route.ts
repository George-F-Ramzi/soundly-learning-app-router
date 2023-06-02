import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { Artists, Like, Songs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { jwtVerify } from "jose";

export async function GET(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { payload } = await jwtVerify(
    token!,
    new TextEncoder().encode(process.env.JWT_PASS)
  );
  let id = Number(payload.id);

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
      .from(Like)
      .where(eq(Like.artist, id))
      .leftJoin(Songs, eq(Songs.id, Like.song))
      .leftJoin(Artists, eq(Artists.id, Songs.artist));
    return NextResponse.json(songs);
  } catch (error) {
    return new Response("Something Wrong Happen", { status: 400 });
  }
}
