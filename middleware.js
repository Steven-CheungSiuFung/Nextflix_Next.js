import { NextResponse } from "next/server";

import { verifyToken } from "./lib/auth";

export async function middleware(req) {
  const token = req ? req.cookies.get("token") : null;
  const userId = await verifyToken(token);

  const { pathname } = req.nextUrl;

  if (userId || pathname.includes("/api/login")) {
    return NextResponse.next();
  }

  if (!userId && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/my-list", "/history", "/", "/video/:path*"],
};
