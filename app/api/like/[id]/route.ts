import { db } from "@/db/db";
import { Like, Notification, Songs } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let url = req.url;
  let index = url.indexOf("like");
  let song_id = Number(url.slice(index + 5));

  try {
    let song = await db.select().from(Songs).where(eq(Songs.id, song_id));

    if (song.length === 0) {
      return new Response("This Dont Exist", { status: 400 });
    }

    await db.insert(Like).values({ artist: id, song: song_id });

    await db
      .update(Songs)
      .set({ likes: sql` ${Songs.likes} + 1 ` })
      .where(eq(Songs.id, song_id));

    await db.insert(Notification).values({
      message: "Likes Your Song",
      nottifier: song[0].artist,
      trigger: id,
      song: song_id,
    });

    return new Response("Done", { status: 200 });
  } catch (error) {
    return new Response("Something Wrong Happen", { status: 400 });
  }
}
