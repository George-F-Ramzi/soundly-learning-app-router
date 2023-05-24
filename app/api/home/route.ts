import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { IArtist, ISong } from "@/utils/types";

export async function GET() {
  let artists = await prisma.artist.findMany({
    orderBy: { followers: "desc" },
    select: {
      id: true,
      followers: true,
      photo_url: true,
      username: true,
    },
    take: 9,
  });

  let discover = await prisma.song.findMany({
    orderBy: { likes: "desc" },
    include: { artist: { select: { username: true } } },
    take: 9,
  });

  return NextResponse.json({ discover, popular: artists });
}
