import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { Artists, Notification } from "@/db/schema";
import { eq } from "drizzle-orm";
import { jwtVerify } from "jose";

export async function GET(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { payload } = await jwtVerify(
    token!,
    new TextEncoder().encode(process.env.JWT_PASS)
  );
  let id = Number(payload.id);

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
