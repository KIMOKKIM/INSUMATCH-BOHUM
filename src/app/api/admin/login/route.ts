import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;
    // Simple hardcoded credentials (replace in prod)
    if (username === "teomok1" && password === "teomok$123") {
      const res = NextResponse.json({ ok: true });
      // set a simple cookie for admin session
      res.cookies.set("insumatch_admin", "1", { httpOnly: true, path: "/" });
      return res;
    }
    return NextResponse.json({ ok: false }, { status: 401 });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

