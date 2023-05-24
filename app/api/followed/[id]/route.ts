import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let url = req.url;
  let index = url.indexOf("followed");
  let artist_id = url.slice(index + 9);

  let followed = prisma.follower.findFirst({
    where: { artist_id: Number(artist_id), fan_id: Number(id) },
  });

  return NextResponse.json(followed);
}
