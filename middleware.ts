import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

export function middleware(request: NextRequest) {
  let requestHeaders = new Headers(request.headers);
  let token = requestHeaders.get("x-auth-token");

  try {
    jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload;
    return NextResponse.next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      let { message }: JsonWebTokenError = error;
      return new Response(message, { status: 400 });
    }
  }
}

export const config = {
  matcher: ["/api/me"],
};
