import { followers, notification } from "@/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let url = req.url;
  let index = url.indexOf("follow");
  let artist_id = url.slice(index + 7);

  let followed = followers.findOne({
    artist: Number(artist_id),
    fan: Number(id),
  });

  if (followed) {
    return new Response("You Allready Follow This User", { status: 400 });
  }

  followers.insertOne({
    artist: Number(artist_id),
    fan: Number(id),
  });

  notification.insertOne({
    trigger: Number(id),
    nottifier: Number(artist_id),
    song: null,
    message: "Started Following You",
  });

  return new Response("Done", { status: 200 });
}
