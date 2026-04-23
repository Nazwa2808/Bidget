import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const authPages = ["/login", "/register"];

  // ❌ BELUM LOGIN → KE LOGIN
  if (!token && !authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

      // 🔒 Kalau buka /admin tapi bukan admin
      if (pathname.startsWith("/admin") && decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // ✅ Sudah login → gak boleh ke login/register
      if (authPages.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
      }

    } catch (err) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};