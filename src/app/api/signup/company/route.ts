import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { logoBase64, logoName } = body as { logoBase64?: string; logoName?: string };

    if (logoBase64 && logoName) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      try {
        fs.mkdirSync(uploadsDir, { recursive: true });
      } catch (e) {}
      const ext = path.extname(logoName) || ".png";
      const safeName = `${Date.now()}-${logoName.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const filePath = path.join(uploadsDir, safeName);
      const buffer = Buffer.from(logoBase64, "base64");
      fs.writeFileSync(filePath, buffer);
      return NextResponse.json({ ok: true, url: `/uploads/${safeName}` });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

