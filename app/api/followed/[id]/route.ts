import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "@/db/db";
import { Follower } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let url = req.url;
  let index = url.indexOf("followed");
  let artist_id = Number(url.slice(index + 9));

  try {
    let followed = await db
      .select()
      .from(Follower)
      .where(and(eq(Follower.artist, artist_id), eq(Follower.fan, id)));

    if (followed.length === 0) return NextResponse.json(null);

    return NextResponse.json(followed);
  } catch (error) {
    new Response("Something Wrong Happen", { status: 400 });
  }
}
