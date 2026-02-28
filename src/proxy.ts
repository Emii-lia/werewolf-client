import { NextRequest, NextResponse } from "next/server";
import { protectedRoutes } from "@/commons/routes";

export default function proxy(req: NextRequest) {
  const { cookies, nextUrl } = req;
  const authToken = cookies.get('auth-token')

  const isProtected = protectedRoutes.some(route => nextUrl.pathname.startsWith(route));

  if (isProtected && !authToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel).*)'
};