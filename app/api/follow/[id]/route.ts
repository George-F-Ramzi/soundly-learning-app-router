import { db } from "@/db/db";
import { Artists, Follower, Notification } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let url = req.url;
  let index = url.indexOf("follow");
  let artist_id = Number(url.slice(index + 7));

  try {
    await db.insert(Follower).values({ artist: artist_id, fan: id });

    await db
      .update(Artists)
      .set({ followers: sql`${Artists.followers} = ${Artists.followers} + 1 ` })
      .where(eq(Artists.id, artist_id));

    await db
      .update(Artists)
      .set({ follwoing: sql`${Artists.follwoing} = ${Artists.follwoing} + 1 ` })
      .where(eq(Artists.id, id));

    await db.insert(Notification).values({
      message: "Started Following You",
      nottifier: artist_id,
      trigger: id,
      song: null,
    });
    return new Response("Done", { status: 200 });
  } catch (error) {
    new Response("Something Wrong Happen", { status: 400 });
  }
}
