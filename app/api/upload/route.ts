import { db } from "@/db/db";
import { Artists, Songs, Notification, Follower } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import cloudinary from "@/utils/cloudinary";
import { jwtVerify } from "jose";

export async function POST(req: Request) {
  let token = req.headers.get("x-auth-token");
  let { payload } = await jwtVerify(
    token!,
    new TextEncoder().encode(process.env.JWT_PASS)
  );
  let id = Number(payload.id);

  let data = await req.formData();
  let name = data.get("name") as string;
  let file = data.get("song") as string;
  let file2 = data.get("cover") as string;

  try {
    let { url: song } = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    let { url: cover } = await cloudinary.uploader.upload(file2);

    let { insertId } = await db
      .insert(Songs)
      .values({ cover, song, name, artist: id });

    await db
      .update(Artists)
      .set({ songs: sql`${Artists.songs} + 1` })
      .where(eq(Artists.id, id));

    let followers = await db
      .select({ nottifier: Follower.fan })
      .from(Follower)
      .where(eq(Follower.artist, id));

    let notification_data = followers.map((f) => {
      return {
        message: "Uploaded A New Song",
        nottifier: f.nottifier,
        trigger: id,
        song: Number(insertId),
      };
    });

    await db.insert(Notification).values(notification_data);

    return new Response("Done", { status: 200 });
  } catch (error) {
    return new Response("Something Wrong Happen", { status: 400 });
  }
}
