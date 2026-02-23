import { NextResponse } from "next/server";
import { getJobs, addJob } from "@/lib/jobsStore";

function isAdminRequest(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  return cookie.includes("insumatch_admin=1");
}

export async function GET() {
  const jobs = getJobs();
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  try {
    if (!isAdminRequest(req)) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    addJob(body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

