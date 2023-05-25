import { NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { db } from "@/db/db";
import { Artists, Notification } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  let token = req.headers.get("x-auth-token");
  let decoded = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let id = Number(decoded.id);

  try {
    let data = await db
      .select({
        id: Notification.id,
        trigger: Notification.trigger,
        nottifier: Notification.nottifier,
        message: Notification.message,
        song: Notification.song,
        cover: Artists.cover,
        name: Artists.name,
      })
      .from(Notification)
      .where(eq(Notification.nottifier, id))
      .leftJoin(Artists, eq(Artists.id, Notification.trigger));

    return NextResponse.json(data);
  } catch (error) {
    return new Response("Something Wrong Happen", { status: 400 });
  }
}
