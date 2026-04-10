import fs from "fs";
import path from "path";

import { NextResponse } from "next/server";

const ROOT = path.join(process.cwd(), "assets", "images", "projects");

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

function decodeSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function resolvedUnderRoot(segments: string[]): string | null {
  const decoded = segments.map(decodeSegment);
  const absRoot = path.resolve(ROOT);
  const candidate = path.resolve(absRoot, ...decoded);
  const rel = path.relative(absRoot, candidate);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    return null;
  }
  return candidate;
}

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: {
    params: { path: string[] } | Promise<{ path: string[] }>;
  }
) {
  const { path: segments } = await context.params;
  if (!segments?.length) {
    return new NextResponse(null, { status: 404 });
  }

  const filePath = resolvedUnderRoot(segments);
  if (!filePath) {
    return new NextResponse(null, { status: 404 });
  }

  let stat: fs.Stats;
  try {
    stat = fs.statSync(filePath);
  } catch {
    return new NextResponse(null, { status: 404 });
  }

  if (!stat.isFile()) {
    return new NextResponse(null, { status: 404 });
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] ?? "application/octet-stream";
  const buffer = fs.readFileSync(filePath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
