import { NextResponse } from "next/server";
import { updateJob, deleteJob } from "@/lib/jobsStore";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const patch = await req.json();
    updateJob(params.id, patch);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    deleteJob(params.id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

