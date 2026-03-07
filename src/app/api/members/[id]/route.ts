import { NextResponse } from "next/server";
import { updateMember, deleteMember } from "@/lib/membersStore";

function isAdminRequest(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  return cookie.includes("insumatch_admin=1");
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!isAdminRequest(req)) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
    const patch = await req.json();
    updateMember(params.id, patch);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!isAdminRequest(req)) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
    deleteMember(params.id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

