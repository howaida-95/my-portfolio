import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const CV_FILENAME = "Senior Frontend Developer Cv_Howaida.pdf";
const CV_PATH = path.join(process.cwd(), "assets", "files", CV_FILENAME);

export async function GET() {
  try {
    const pdfBuffer = await fs.readFile(CV_PATH);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${CV_FILENAME}"`,
        "Content-Length": String(pdfBuffer.byteLength),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load CV from filesystem";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

