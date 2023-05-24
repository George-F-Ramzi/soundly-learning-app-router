import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;

  let songs = await prisma.like.findMany({
    where: { fan_id: Number(id) },
    include: { song: { include: { artist: { select: { username: true } } } } },
  });

  let result = songs.map((s) => {
    return {
      id: s.song.id,
      song_name: s.song.song_name,
      song_cover_url: s.song.song_cover_url,
      song_file_url: s.song.song_file_url,
      artist_id: s.song.artist_id,
      artist: s.song.artist,
    };
  });

  return NextResponse.json(result);
}
