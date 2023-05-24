import prisma from "@/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let url = req.url;
  let index = url.indexOf("follow");
  let artist_id = url.slice(index + 7);

  await prisma.follower.create({
    data: { artist_id: Number(artist_id), fan_id: Number(id) },
  });

  await prisma.artist.update({
    where: { id: Number(id) },
    data: { following: { increment: 1 } },
  });

  await prisma.artist.update({
    where: { id: Number(artist_id) },
    data: { followers: { increment: 1 } },
  });

  await prisma.notification.create({
    data: {
      message_detail: "Started Following You",
      nottifer_id: Number(artist_id),
      trigger_id: Number(id),
    },
  });
  return new Response("Done", { status: 200 });
}
