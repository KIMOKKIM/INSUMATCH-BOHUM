import { NextResponse } from "next/server";
import { getJobs, addJob } from "@/lib/jobsStore";

export async function GET() {
  const jobs = getJobs();
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    addJob(body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

