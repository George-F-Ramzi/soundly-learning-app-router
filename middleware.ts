import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  let requestHeaders = new Headers(request.headers);
  let token = requestHeaders.get("x-auth-token");

  try {
    await jwtVerify(token!, new TextEncoder().encode(process.env.JWT_PASS));
    return NextResponse.next();
  } catch (error) {
    return new Response("Invalid Token", { status: 400 });
  }
}

export const config = {
  matcher: [
    "/api/me",
    "/api/inbox",
    "/api/liked",
    "/api/follow/:path*",
    "/api/unfollow/:path*",
    "/api/followed/:path*",
    "/api/isliked/:path*",
    "/api/like/:path*",
    "/api/dislike/:path*",
    "/api/comment/:path*",
    "/api/upload",
  ],
};
