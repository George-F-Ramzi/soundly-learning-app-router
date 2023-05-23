import { likes } from "@/utils/db";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let url = req.url;
  let index = url.indexOf("isliked");
  let song_id = url.slice(index + 8);

  let liked = likes.findOne({
    artist: Number(id),
    song: Number(song_id),
  });

  return NextResponse.json(liked);
}
