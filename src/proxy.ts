import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // 🔒 Protected routes (require auth)
  const protectedRoutes = [
    "/dashboard",
    "/admin",
    "/blog/new",
    "/gallery/new",
    "/places/new",
  ];

  // 🔓 Auth pages (should not be accessible when logged in)
  const authRoutes = ["/login", "/register"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthPage = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // ❌ Not logged in → trying to access protected route
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Logged in → trying to access login/register
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/blog/new",
    "/gallery/new",
    "/places/new",
    "/login",
    "/register",
  ],
};
