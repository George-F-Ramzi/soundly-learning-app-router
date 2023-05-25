import { NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { db } from "@/db/db";
import { Artists, Like, Songs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;

  try {
    let songs = await db
      .select({
        id: Songs.name,
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
