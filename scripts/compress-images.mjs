/**
 * Image optimisation pipeline.
 *
 * Source priority (in order):
 *   1. assets/images/projects/**\/*.{png,jpg,jpeg}  — original screenshots
 *   2. public/images/projects/**\/*.webp (non-thumb) — already-converted WebP
 *
 * For each source image it produces:
 *   public/images/projects/**\/{name}.webp        full-res  (max 1920px, q75)
 *   public/images/projects/**\/{name}_thumb.webp  grid cover (max 480px,  q65)
 *
 * Run once (or after adding new project screenshots):
 *   node scripts/compress-images.mjs
 *
 * Then regenerate the manifest:
 *   node scripts/generate-portfolio-manifest.mjs
 *
 * Or do both in one go:
 *   npm run prepare-images
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const PNG_SRC_DIR  = path.join(ROOT, "assets", "images", "projects");
const WEBP_SRC_DIR = path.join(ROOT, "public", "images", "projects");
const OUT_DIR      = path.join(ROOT, "public", "images", "projects");

const FULL_MAX_WIDTH  = 1920;
const FULL_QUALITY    = 75;
const THUMB_MAX_WIDTH = 480;
const THUMB_QUALITY   = 65;

/** Matches original PNG/JPG sources */
const PNG_EXT  = /\.(png|jpe?g)$/i;
/** Matches processed full-res WebP (excludes _thumb variants) */
const FULL_WEBP = /(?<!_thumb)\.webp$/i;
/** Matches thumb variants — skip these as sources */
const THUMB_WEBP = /_thumb\.webp$/i;

let processed = 0;
let skipped = 0;
let errors = 0;
const startMs = Date.now();

/**
 * Convert one source image into a full-res WebP and a thumbnail WebP.
 * Each output is skipped individually if already up-to-date.
 */
async function convertImage(srcPath, baseName) {
  const fullOut  = `${baseName}.webp`;
  const thumbOut = `${baseName}_thumb.webp`;

  const srcStat = fs.statSync(srcPath);
  fs.mkdirSync(path.dirname(fullOut), { recursive: true });

  const needsFull = !fs.existsSync(fullOut) ||
    fs.statSync(fullOut).mtimeMs < srcStat.mtimeMs;
  const needsThumb = !fs.existsSync(thumbOut) ||
    fs.statSync(thumbOut).mtimeMs < srcStat.mtimeMs;

  if (!needsFull && !needsThumb) {
    skipped++;
    return;
  }

  try {
    const img = sharp(srcPath);

    if (needsFull) {
      await img
        .clone()
        .resize({ width: FULL_MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: FULL_QUALITY, effort: 4 })
        .toFile(fullOut);
    }

    if (needsThumb) {
      await img
        .clone()
        .resize({ width: THUMB_MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: THUMB_QUALITY, effort: 4 })
        .toFile(thumbOut);
    }

    const srcKB   = (srcStat.size / 1024).toFixed(0);
    const fullKB  = needsFull  ? (fs.statSync(fullOut).size  / 1024).toFixed(0) : "–";
    const thumbKB = needsThumb ? (fs.statSync(thumbOut).size / 1024).toFixed(0) : "–";
    console.log(
      `  ✓  ${path.relative(ROOT, srcPath).padEnd(70)} ` +
        `${String(srcKB).padStart(6)} KB  →  full ${String(fullKB).padStart(5)} KB  ` +
        `thumb ${String(thumbKB).padStart(4)} KB`
    );
    processed++;
  } catch (err) {
    console.error(`  ✗  ${srcPath}: ${err.message}`);
    errors++;
  }
}

/**
 * Walk `srcBase` for original PNG/JPG files.
 * Writes output to the matching path under `outBase` with a .webp extension.
 */
async function walkPngSources(srcBase, outBase, relPath = "") {
  const absDir = path.join(srcBase, relPath);
  let entries;
  try { entries = fs.readdirSync(absDir, { withFileTypes: true }); } catch { return; }

  for (const entry of entries) {
    const entryRel = relPath ? `${relPath}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      await walkPngSources(srcBase, outBase, entryRel);
    } else if (PNG_EXT.test(entry.name)) {
      const srcPath  = path.join(srcBase, entryRel);
      const baseName = path.join(outBase, entryRel).replace(PNG_EXT, "");
      await convertImage(srcPath, baseName);
    }
  }
}

/**
 * Walk `srcBase` for existing full-res WebP files (non-thumb) and
 * produce thumbnails only (full-res already exists as the source itself).
 */
async function walkWebpSources(srcBase, relPath = "") {
  const absDir = path.join(srcBase, relPath);
  let entries;
  try { entries = fs.readdirSync(absDir, { withFileTypes: true }); } catch { return; }

  for (const entry of entries) {
    const entryRel = relPath ? `${relPath}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      await walkWebpSources(srcBase, entryRel);
    } else if (FULL_WEBP.test(entry.name) && !THUMB_WEBP.test(entry.name)) {
      const srcPath  = path.join(srcBase, entryRel);
      const baseName = srcPath.replace(FULL_WEBP, "");
      await convertImage(srcPath, baseName);
    }
  }
}

async function main() {
  const hasPngSources = fs.existsSync(PNG_SRC_DIR) &&
    fs.readdirSync(PNG_SRC_DIR, { recursive: true })
      .some((f) => PNG_EXT.test(String(f)));

  console.log(`[compress-images] Output : ${OUT_DIR}`);
  console.log(`[compress-images] Full   : max ${FULL_MAX_WIDTH}px  q${FULL_QUALITY}`);
  console.log(`[compress-images] Thumb  : max ${THUMB_MAX_WIDTH}px  q${THUMB_QUALITY}\n`);

  if (hasPngSources) {
    console.log(`[compress-images] Source : PNG/JPG files in ${PNG_SRC_DIR}\n`);
    await walkPngSources(PNG_SRC_DIR, OUT_DIR);
  } else {
    console.log(`[compress-images] Source : existing WebP files in ${WEBP_SRC_DIR}\n`);
    await walkWebpSources(WEBP_SRC_DIR);
  }

  const elapsed = ((Date.now() - startMs) / 1000).toFixed(1);
  console.log(
    `\n[compress-images] Done in ${elapsed}s — ` +
      `${processed} converted, ${skipped} up-to-date, ${errors} error(s).`
  );

  if (processed > 0 || skipped === 0) {
    console.log("\n[compress-images] Next step: node scripts/generate-portfolio-manifest.mjs");
  }
}

main().catch((err) => {
  console.error("[compress-images] Fatal:", err);
  process.exit(1);
});
