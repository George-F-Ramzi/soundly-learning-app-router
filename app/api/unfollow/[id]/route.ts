import prisma from "@/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function DELETE(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let url = req.url;
  let index = url.indexOf("unfollow");
  let artist_id = url.slice(index + 9);

  await prisma.follower.delete({
    where: {
      artist_id_fan_id: { artist_id: Number(artist_id), fan_id: Number(id) },
    },
  });

  await prisma.artist.update({
    where: { id: Number(id) },
    data: { following: { decrement: 1 } },
  });

  await prisma.artist.update({
    where: { id: Number(artist_id) },
    data: { followers: { decrement: 1 } },
  });

  return new Response("Done", { status: 200 });
}
