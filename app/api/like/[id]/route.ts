import { likes, notification, songs } from "@/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let url = req.url;
  let index = url.indexOf("like");
  let song_id = url.slice(index + 5);

  let liked = likes.findOne({
    artist: Number(id),
    song: Number(song_id),
  });

  if (liked) {
    return new Response("You Allready Likes This Song", { status: 400 });
  }

  likes.insertOne({
    artist: Number(id),
    song: Number(song_id),
  });

  let { artist } = songs.findOne({ id: Number(song_id) });

  notification.insertOne({
    trigger: Number(id),
    nottifier: Number(artist),
    song: song_id,
    message: "Likes Your Song",
  });

  return new Response("Done", { status: 200 });
}
