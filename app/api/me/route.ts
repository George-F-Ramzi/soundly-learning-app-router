import { artists } from "@/utils/db";
import { NextResponse } from "next/server";
import { IArtist } from "@/utils/types";

export async function GET() {
  let me: IArtist = artists.findOne({ id: 1 });
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
