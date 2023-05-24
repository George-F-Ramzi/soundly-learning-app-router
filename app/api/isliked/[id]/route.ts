import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/utils/db";

export async function GET(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let url = req.url;
  let index = url.indexOf("isliked");
  let song_id = url.slice(index + 8);

  let liked = prisma.like.findFirst({
    where: { song_id: Number(song_id), fan_id: Number(id) },
  });

  return NextResponse.json(liked);
}
