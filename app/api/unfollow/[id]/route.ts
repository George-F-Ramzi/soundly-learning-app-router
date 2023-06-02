import { db } from "@/db/db";
import { Artists, Follower } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { jwtVerify } from "jose";

export async function DELETE(req: Request) {
  let url = req.url;
  let index = url.indexOf("unfollow");
  let artist_id = Number(url.slice(index + 9));
  let token = req.headers.get("x-auth-token");
  let { payload } = await jwtVerify(
    token!,
    new TextEncoder().encode(process.env.JWT_PASS)
  );
  let id = Number(payload.id);

  try {
    await db
      .delete(Follower)
      .where(and(eq(Follower.artist, artist_id), eq(Follower.fan, id)));

    await db
      .update(Artists)
      .set({
        followers: sql` ${Artists.followers} - 1 `,
      })
      .where(eq(Artists.id, artist_id));

    await db
      .update(Artists)
      .set({
        follwoing: sql`${Artists.follwoing} - 1 `,
      })
      .where(eq(Artists.id, id));
    return new Response("Done", { status: 200 });
  } catch (error) {
    return new Response("Something Wrong Happen", { status: 400 });
  }
}
