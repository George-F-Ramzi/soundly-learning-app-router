import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "@/db/db";
import { Like } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let url = req.url;
  let index = url.indexOf("isliked");
  let song_id = Number(url.slice(index + 8));

  try {
    let liked = await db
      .select()
      .from(Like)
      .where(and(eq(Like.artist, id), eq(Like.song, song_id)));

    if (liked.length === 0) return NextResponse.json(null);

    return NextResponse.json(liked);
  } catch (error) {
    return new Response("Something Wrong Happen", { status: 400 });
  }
}
