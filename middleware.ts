import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (
    !session &&
    (path === "/" ||
      path === "/profile" ||
      path.startsWith("/Dashboard") ||
      path === "/feedback")
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session) {
    var userRole = session?.role;

    if (path === "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (path === "/" || path === "/profile") {
      return NextResponse.next();
    }

    if (path.startsWith("/Dashboard")) {
      if (userRole === "admin") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/NoAccess", req.url));
      }
    }
  }

  return NextResponse.next();
}
