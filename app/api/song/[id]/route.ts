import { NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function GET(req: Request) {
  let url = req.url;
  let index = url.indexOf("song");
  let id = url.slice(index + 5);

  let song_info = await prisma.song.findUnique({
    where: { id: Number(id) },
    include: { artist: { select: { username: true } } },
  });

  if (!song_info) return new Response("song didnt exist", { status: 400 });

  let song_comments = await prisma.comment.findMany({
    where: { song_id: Number(id) },
    include: { artist: { select: { username: true, photo_url: true } } },
  });

  return NextResponse.json({ info: song_info, comments: song_comments });
}
