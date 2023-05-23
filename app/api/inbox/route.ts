import { artists, notification } from "@/utils/db";
import { NextResponse } from "next/server";
import { InboxCardType } from "@/utils/types";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  let token = req.headers.get("x-auth-token");
  let decoded = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let id = Number(decoded.id);

  let data: InboxCardType[] = notification.find({ nottifier: id });

  let ids = data.map((i) => i.trigger);
  let artists_data = artists.find({ id: { $in: ids } });

  data.forEach((d: any) => {
    for (let index = 0; index < artists_data.length; index++) {
      if (d.trigger === artists_data[index].id)
        d.artist = {
          photo: artists_data[index].photo,
          username: artists_data[index].username,
        };
    }
  });

  return NextResponse.json(data);
}
