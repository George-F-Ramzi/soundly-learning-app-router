import { artists } from "@/utils/db";
import { NextResponse } from "next/server";
import Joi, { Schema } from "joi";
import hashing from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  let data = await req.json();

  const schema: Schema = Joi.object({
    email: Joi.string().email().required().min(8).max(56).label("Email"),
    username: Joi.string().required().min(8).max(56).label("Username"),
    password: Joi.string().required().min(8).max(56).label("Password"),
  });
  const { error } = schema.validate(data);
  if (error) return new Response(error.message, { status: 400 });

  let artist = artists.findOne({ email: data.email });

  if (artist !== null) {
    return new Response("Email ALready Joined", { status: 400 });
  }

  let hashed_pass: string = await hashing.hash(data.password, 10);
  let user_id = Math.random();

  let user = artists.insert({
    id: user_id,
    username: data.username,
    email: data.email,
    password: hashed_pass,
    followers: 0,
    following: 0,
    songs: 0,
    photo:
      "https://res.cloudinary.com/dwnvkwrox/image/upload/v1671018225/123456789.png",
  });

  let token = jwt.sign({ id: user.id }, process.env.JWT_PASS!);

  return NextResponse.json("Done", {
    headers: { "x-auth-token": token },
    status: 200,
  });
}
