import { NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function GET(req: Request) {
  let url = req.url;
  let index = url.indexOf("artist");
  let id = url.slice(index + 7);

  let artist_info = await prisma.artist.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      followers: true,
      photo_url: true,
      username: true,
      following: true,
      songs_uploaded_number: true,
    },
  });

  if (artist_info === null) {
    return new Response("Email Doesn't Exist", { status: 400 });
  }

  let artist_songs = await prisma.song.findMany({
    where: { artist_id: Number(id) },
    include: { artist: { select: { username: true } } },
  });

  return NextResponse.json({ info: artist_info, songs: artist_songs });
}
