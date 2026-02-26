import { NextResponse } from "next/server";
import { getMembers, addMember } from "@/lib/membersStore";

export async function GET() {
  try {
    const members = getMembers();
    return NextResponse.json(members);
  } catch (e) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // basic validation
    if (!body || !body.id || !body.name) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
    }
    addMember(body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

