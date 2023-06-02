import { NextResponse } from "next/server";
import Joi, { Schema } from "joi";
import hashing from "bcrypt";
import { db } from "@/db/db";
import { Artists } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as jose from "jose";

export async function POST(req: Request) {
  let data = await req.json();

  const schema: Schema = Joi.object({
    email: Joi.string().email().required().min(8).max(56).label("Email"),
    username: Joi.string().required().min(8).max(56).label("Username"),
    password: Joi.string().required().min(8).max(56).label("Password"),
  });

  const { error } = schema.validate(data);
  if (error) return new Response(error.message, { status: 400 });

  try {
    let artist = await db
      .select({
        email: Artists.email,
      })
      .from(Artists)
      .where(eq(Artists.email, data.email));

    if (artist.length !== 0) {
      return new Response("Email ALready Joined", { status: 400 });
    }

    let hashed_pass: string = await hashing.hash(data.password, 10);

    let inserted = await db.insert(Artists).values({
      email: data.email,
      name: data.username,
      password: hashed_pass,
    });

    let token = await new jose.SignJWT({ id: inserted.insertId })
      .setProtectedHeader({ alg: "HS256" })
      .sign(new TextEncoder().encode(process.env.JWT_PASS));

    return NextResponse.json("Done", {
      headers: { "x-auth-token": token },
      status: 200,
    });
  } catch (error) {
    return new Response("Something Wrong Happen", { status: 400 });
  }
}
