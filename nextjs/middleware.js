import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await getToken({ req: req, secret: process.env.JWT_SECRET });

  if (req.nextUrl.pathname.startsWith("/member/login") && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/member/myReserve") &&
    session === null
  ) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  } else {
    // 데이터베이스에서 나의 예약 목록을 가져온다.
  }

  if (req.nextUrl.pathname.startsWith("/public/reserve") && session === null) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
}
