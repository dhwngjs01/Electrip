import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import pool from "@/util/database";

export async function proxy(req) {
  const token = await getToken({ req: req, secret: process.env.JWT_SECRET });
  const currentUser = token?.user?.user_no
    ? await pool.query(
        "SELECT id, is_staff FROM users WHERE id = $1 AND is_active = true",
        [token.user.user_no]
      )
    : null;
  const user = currentUser?.rows[0] || null;

  if (req.nextUrl.pathname.startsWith("/member/login") && user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/member/myReserve") &&
    !user
  ) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  } else {
    // 데이터베이스에서 나의 예약 목록을 가져온다.
  }

  if (req.nextUrl.pathname.startsWith("/public/reserve") && !user) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    user?.is_staff !== true
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/member/login",
    "/member/myReserve/:path*",
    "/public/reserve/:path*",
  ],
};
