import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { Follower } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { jwtVerify } from "jose";

export async function GET(req: Request) {
  let url = req.url;
  let index = url.indexOf("followed");
  let artist_id = Number(url.slice(index + 9));
  let token = req.headers.get("x-auth-token");
  let { payload } = await jwtVerify(
    token!,
    new TextEncoder().encode(process.env.JWT_PASS)
  );
  let id = Number(payload.id);

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
