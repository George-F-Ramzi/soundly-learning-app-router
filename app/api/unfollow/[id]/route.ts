import { followers } from "@/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function DELETE(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let url = req.url;
  let index = url.indexOf("unfollow");
  let artist_id = url.slice(index + 9);

  let followed = followers.findOne({
    artist: Number(artist_id),
    fan: Number(id),
  });

  if (!followed) {
    return new Response("You Don't Follow This User", { status: 400 });
  }

  followers.removeWhere({
    artist: Number(artist_id),
    fan: Number(id),
  });

  return new Response("Done", { status: 200 });
}
