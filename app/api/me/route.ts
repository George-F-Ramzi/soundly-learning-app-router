import { artists } from "@/utils/db";
import { NextResponse } from "next/server";
import { IArtist } from "@/utils/types";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  let token = req.headers.get("x-auth-token");
  let decoded = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
  let id = Number(decoded.id);

  let me: IArtist = artists.findOne({ id });

  //@ts-ignore
  delete me.password;
  //@ts-ignore
  delete me.email;
  //@ts-ignore
  delete me.meta;
  //@ts-ignore
  delete me["$loki"];

  return NextResponse.json(me);
}
