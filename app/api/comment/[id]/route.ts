import prisma from "@/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let url = req.url;
  let index = url.indexOf("comment");
  let song_id = url.slice(index + 8);

  let data = await req.json();

  if (!data.details) return new Response("Details Not Found", { status: 400 });

  let song_row = await prisma.song.findUnique({
    where: { id: Number(song_id) },
    select: { artist_id: true },
  });

  if (song_row === null) return new Response("Song Not Found", { status: 400 });

  await prisma.comment.create({
    data: {
      details: data.details,
      artist_id: Number(id),
      song_id: Number(song_id),
    },
  });

  await prisma.notification.create({
    data: {
      message_detail: "Commented on your song",
      nottifer_id: song_row.artist_id,
      trigger_id: Number(id),
      song_id: Number(song_id),
    },
  });

  return new Response("Done", { status: 200 });
}
