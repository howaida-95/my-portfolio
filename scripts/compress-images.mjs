/**
 * Converts all PNG/JPG/JPEG images under assets/images/projects
 * into WebP files under public/images/projects, preserving the
 * directory structure that generate-portfolio-manifest.mjs expects.
 *
 * Also copies hero-banner.png and profile.jpg as WebP to assets/images.
 *
 * Run once (or after adding new project screenshots):
 *   node scripts/compress-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const SRC_DIR = path.join(ROOT, "assets", "images", "projects");
const OUT_DIR = path.join(ROOT, "public", "images", "projects");

/** Maximum width for project screenshots (covers are shown ≤ 440 px on most viewports). */
const MAX_WIDTH = 1920;
/** WebP quality — good balance between file size and visual fidelity for screenshots. */
const WEBP_QUALITY = 82;

const IMAGE_EXT = /\.(png|jpe?g)$/i;

let processed = 0;
let skipped = 0;
let errors = 0;
const startMs = Date.now();

/**
 * Compress a single image to WebP and write to the output path.
 * Skips if the output already exists and is newer than the source.
 */
async function convertToWebP(srcPath, outPath) {
  const outWebP = outPath.replace(IMAGE_EXT, ".webp");

  const srcStat = fs.statSync(srcPath);
  if (fs.existsSync(outWebP)) {
    const outStat = fs.statSync(outWebP);
    if (outStat.mtimeMs >= srcStat.mtimeMs) {
      skipped++;
      return;
    }
  }

  fs.mkdirSync(path.dirname(outWebP), { recursive: true });

  try {
    await sharp(srcPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(outWebP);

    const srcKB = (srcStat.size / 1024).toFixed(0);
    const outKB = (fs.statSync(outWebP).size / 1024).toFixed(0);
    console.log(
      `  ✓  ${path.relative(ROOT, srcPath).padEnd(70)} ${srcKB.padStart(6)} KB → ${outKB.padStart(6)} KB`
    );
    processed++;
  } catch (err) {
    console.error(`  ✗  ${srcPath}: ${err.message}`);
    errors++;
  }
}

/** Walk a directory tree and convert every image file found. */
async function walkAndConvert(srcBase, outBase, relPath = "") {
  const absDir = path.join(srcBase, relPath);
  let entries;
  try {
    entries = fs.readdirSync(absDir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const entryRel = relPath ? `${relPath}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      await walkAndConvert(srcBase, outBase, entryRel);
    } else if (IMAGE_EXT.test(entry.name)) {
      const srcPath = path.join(srcBase, entryRel);
      const outPath = path.join(outBase, entryRel);
      await convertToWebP(srcPath, outPath);
    }
  }
}

async function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(
      `[compress-images] Source directory not found: ${SRC_DIR}\n` +
        "Make sure assets/images/projects exists and contains your screenshots."
    );
    process.exit(1);
  }

  console.log(`[compress-images] Source : ${SRC_DIR}`);
  console.log(`[compress-images] Output : ${OUT_DIR}`);
  console.log(`[compress-images] Max width: ${MAX_WIDTH}px  |  WebP quality: ${WEBP_QUALITY}\n`);

  await walkAndConvert(SRC_DIR, OUT_DIR);

  const elapsed = ((Date.now() - startMs) / 1000).toFixed(1);
  console.log(
    `\n[compress-images] Done in ${elapsed}s — ` +
      `${processed} converted, ${skipped} up-to-date, ${errors} error(s).`
  );

  if (processed > 0 || skipped === 0) {
    console.log(
      "\n[compress-images] Next step: node scripts/generate-portfolio-manifest.mjs"
    );
  }
}

main().catch((err) => {
  console.error("[compress-images] Fatal:", err);
  process.exit(1);
});
