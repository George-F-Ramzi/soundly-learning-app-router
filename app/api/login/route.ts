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
    password: Joi.string().required().min(8).max(56).label("Password"),
  });
  const { error } = schema.validate(data);
  if (error) return new Response(error.message, { status: 400 });

  try {
    let artist = await db
      .select({
        id: Artists.id,
        email: Artists.email,
        password: Artists.password,
      })
      .from(Artists)
      .where(eq(Artists.email, data.email));

    if (artist.length === 0) {
      return new Response("Email Doesn't Exist", { status: 400 });
    }

    let hashed_pass: boolean = await hashing.compare(
      data.password,
      artist[0].password!
    );

    if (!hashed_pass) {
      return new Response("Invalid Password", { status: 400 });
    }

    let token = await new jose.SignJWT({ id: artist[0].id })
      .setProtectedHeader({ alg: "HS256" })
      .sign(new TextEncoder().encode(process.env.JWT_PASS));

    return NextResponse.json("Done", {
      headers: { "x-auth-token": token },
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("SomeThing Wrong Happen", { status: 400 });
  }
}
