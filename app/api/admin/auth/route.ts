"use server";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";

function isAuthenticated() {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return token === "ok";
}

export async function GET() {
  const authenticated = isAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const password = typeof body?.password === "string" ? body.password : "";
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD 환경 변수가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  if (password !== expected) {
    return NextResponse.json(
      { error: "비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "ok",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 4, // 4시간
  });

  return response;
}


