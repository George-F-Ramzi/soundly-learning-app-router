import { db } from "@/db/db";
import { Comments, Notification, Songs } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let url = req.url;
  let index = url.indexOf("comment");
  let song_id = Number(url.slice(index + 8));

  try {
    let data = await req.json();

    if (!data.details)
      return new Response("Details Not Found", { status: 400 });

    let song = await db.select().from(Songs).where(eq(Songs.id, song_id));

    if (song.length === 0)
      return new Response("Song Not Found", { status: 400 });

    await db
      .insert(Comments)
      .values({ details: data.details, artist: id, song: song_id });

    if (song[0].artist !== id) {
      await db.insert(Notification).values({
        message: "Commented On Your Song",
        nottifier: song[0].artist,
        trigger: id,
        song: song_id,
      });
    }

    return new Response("Done", { status: 200 });
  } catch (error) {
    return new Response("Something WRong Happen", { status: 400 });
  }
}
