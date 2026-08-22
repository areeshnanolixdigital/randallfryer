import { NextResponse } from "next/server";

// Site is temporarily paused: send every route to the paused homepage.
// Remove this file to restore normal routing.
export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") return NextResponse.next();

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
