import { NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { db } from "@/db/db";
import { Artists } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  let token = req.headers.get("x-auth-token");
  let decoded = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let id = Number(decoded.id);

  try {
    let result = await db
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

    if (result.length === 0) return NextResponse.json(false);
    return NextResponse.json(result[0]);
  } catch (error) {
    return new Response("Something Wrong Happen", { status: 400 });
  }
}
