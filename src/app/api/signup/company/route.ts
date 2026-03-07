import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { addMember } from "@/lib/membersStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { logoBase64, logoName, companyName, id, email, phone } = body as {
      logoBase64?: string;
      logoName?: string;
      companyName?: string;
      id?: string;
      email?: string;
      phone?: string;
    };

    let logoUrl: string | undefined;

    if (logoBase64 && logoName) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      try {
        fs.mkdirSync(uploadsDir, { recursive: true });
      } catch (e) {}
      const safeName = `${Date.now()}-${logoName.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const filePath = path.join(uploadsDir, safeName);
      const buffer = Buffer.from(logoBase64, "base64");
      fs.writeFileSync(filePath, buffer);
      logoUrl = `/uploads/${safeName}`;
    }

    // Add member entry (기업) so admin dashboard will show the new company
    if (id && companyName) {
      try {
        addMember({
          id: id.toString(),
          name: companyName,
          type: "기업",
          email: email || "",
          phone: phone || "",
          joinDate: new Date().toISOString().slice(0, 10),
          status: "승인대기",
          raw: { logoUrl },
        } as any);
      } catch (e) {
        console.warn("addMember failed:", e);
      }
    }

    return NextResponse.json({ ok: true, url: logoUrl });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

