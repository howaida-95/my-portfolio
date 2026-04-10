/**
 * Scans public/images/projects and writes lib/portfolio-manifest.json.
 * Run automatically via npm prebuild so Vercel deploys without bundling 300MB+ into lambdas.
 *
 * Prerequisite: run `npm run compress-images` first to convert PNGs → WebP
 * under public/images/projects (or run both via `npm run prepare-images`).
 *
 * For each portfolio item this script:
 *  - Uses the *_thumb.webp variant as coverImage (small, fast-loading grid tile)
 *  - Uses the full .webp files in the images[] array (full-res for carousel)
 *  - Generates a tiny base64 blurDataURL from the cover thumbnail for instant placeholders
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "public", "images", "projects");
const OUT = path.join(__dirname, "..", "lib", "portfolio-manifest.json");

/** Match only processed full-res WebP files (excludes _thumb variants). */
const FULL_WEBP = /(?<!_thumb)\.webp$/i;
/** Match the thumbnail variant. */
const THUMB_WEBP = /_thumb\.webp$/i;

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function categoryFromRel(relPath) {
  if (relPath.startsWith("1-Web Applications")) return "Web Applications";
  if (relPath.startsWith("2- E-Commerce websites")) return "E-Commerce Solutions";
  if (relPath.startsWith("3-Mobile Applications")) return "Mobile Applications";
  return "Mobile Applications";
}

function titleFromFolder(folderName) {
  const stripped = folderName.replace(/^\d+-/, "");
  return stripped
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function excerptForCategory(_category) {
  return "open the preview to browse the full set.";
}

/** Public URL (encoded path segments) under /images/projects/ */
function publicImageUrl(relDir, fileName) {
  const segments = [...relDir.split("/").filter(Boolean), fileName];
  return `/${["images", "projects", ...segments.map((s) => encodeURIComponent(s))].join("/")}`;
}

/**
 * Generate a tiny blurred base64 data URL from a local WebP file.
 * The result is a 16px-wide blurred WebP encoded as a data URL —
 * used as `blurDataURL` in Next.js Image placeholder="blur".
 */
async function generateBlurDataUrl(absPath) {
  try {
    const buf = await sharp(absPath)
      .resize({ width: 16 })
      .blur(2)
      .webp({ quality: 20 })
      .toBuffer();
    return `data:image/webp;base64,${buf.toString("base64")}`;
  } catch {
    return "";
  }
}

async function scanDir(absPath, relPath) {
  let dirents;
  try {
    dirents = fs.readdirSync(absPath, { withFileTypes: true });
  } catch {
    return [];
  }

  const fullWebpNames = dirents
    .filter((d) => d.isFile() && FULL_WEBP.test(d.name))
    .map((d) => d.name)
    .sort(naturalSort);

  const subdirs = dirents.filter((d) => d.isDirectory());
  const fromChildren = (
    await Promise.all(
      subdirs.map((d) =>
        scanDir(path.join(absPath, d.name), relPath ? `${relPath}/${d.name}` : d.name)
      )
    )
  ).flat();

  if (fullWebpNames.length === 0) return fromChildren;
  if (relPath === "") return fromChildren;

  const folderName = path.basename(relPath);
  const images = fullWebpNames.map((name) => publicImageUrl(relPath, name));
  const category = categoryFromRel(relPath);

  const firstFullName = fullWebpNames[0];
  const thumbName = firstFullName.replace(FULL_WEBP, "_thumb.webp");
  const thumbAbsPath = path.join(absPath, thumbName);
  const hasCoverThumb = fs.existsSync(thumbAbsPath);

  const coverImage = hasCoverThumb
    ? publicImageUrl(relPath, thumbName)
    : images[0];

  const blurDataURL = hasCoverThumb ? await generateBlurDataUrl(thumbAbsPath) : "";

  const item = {
    title: titleFromFolder(folderName),
    excerpt: excerptForCategory(category),
    category,
    coverImage,
    blurDataURL,
    images,
  };

  return [item, ...fromChildren];
}

const CATEGORY_ORDER = [
  "Web Applications",
  "E-Commerce Solutions",
  "Mobile Applications",
];

function categorySortKey(category) {
  const i = CATEGORY_ORDER.indexOf(category);
  return i === -1 ? CATEGORY_ORDER.length : i;
}

async function main() {
  if (!fs.existsSync(ROOT)) {
    fs.writeFileSync(OUT, "[]\n", "utf8");
    console.warn(
      "[generate-portfolio-manifest] public/images/projects not found; wrote empty []. " +
        "Move assets/images/projects → public/images/projects to populate the portfolio."
    );
    return;
  }

  const items = await scanDir(ROOT, "");
  items.sort((a, b) => categorySortKey(a.category) - categorySortKey(b.category));
  fs.writeFileSync(OUT, JSON.stringify(items, null, 2) + "\n", "utf8");
  console.log(
    `[generate-portfolio-manifest] wrote ${items.length} item(s) → lib/portfolio-manifest.json`
  );
}

main().catch((err) => {
  console.error("[generate-portfolio-manifest] Fatal:", err);
  process.exit(1);
});
