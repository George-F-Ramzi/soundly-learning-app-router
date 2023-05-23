import {  likes } from "@/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function DELETE(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let url = req.url;
  let index = url.indexOf("like");
  let song_id = url.slice(index + 5);

  let liked = likes.findOne({
    artist: Number(id),
    song: Number(song_id),
  });

  if (!liked) {
    return new Response("You Don't Like This Song", { status: 400 });
  }

  likes.removeWhere({
    artist: Number(id),
    song: Number(song_id),
  });

  return new Response("Done", { status: 200 });
}
