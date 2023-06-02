import { db } from "@/db/db";
import { Like, Songs } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { jwtVerify } from "jose";

export async function DELETE(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { payload } = await jwtVerify(
    token!,
    new TextEncoder().encode(process.env.JWT_PASS)
  );
  let id = Number(payload.id);
  let url = req.url;
  let index = url.indexOf("like");
  let song_id = Number(url.slice(index + 5));

  try {
    await db
      .delete(Like)
      .where(and(eq(Like.artist, id), eq(Like.song, song_id)));

    await db
      .update(Songs)
      .set({ likes: sql`${Songs.likes} -1 ` })
      .where(eq(Songs.id, song_id));

    return new Response("Done", { status: 200 });
  } catch (error) {
    new Response("Something Wrong Happen", { status: 400 });
  }
}
