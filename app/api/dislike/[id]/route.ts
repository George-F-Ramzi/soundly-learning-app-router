import prisma from "@/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function DELETE(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let url = req.url;
  let index = url.indexOf("like");
  let song_id = url.slice(index + 5);

  await prisma.like.delete({
    where: {
      song_id_fan_id: { fan_id: Number(id), song_id: Number(song_id) },
    },
  });

  await prisma.song.update({
    where: { id: Number(song_id) },
    data: { likes: { decrement: 1 } },
  });

  return new Response("Done", { status: 200 });
}
