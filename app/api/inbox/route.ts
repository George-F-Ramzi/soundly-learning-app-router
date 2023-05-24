import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  let token = req.headers.get("x-auth-token");
  let decoded = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let id = Number(decoded.id);

  let data = await prisma.notification.findMany({
    where: { nottifer_id: id },
    include: { trigger: { select: { photo_url: true, username: true } } },
  });

  return NextResponse.json(data);
}
