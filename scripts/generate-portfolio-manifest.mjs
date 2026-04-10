/**
 * Scans public/images/projects and writes lib/portfolio-manifest.json.
 * Run automatically via npm prebuild so Vercel deploys without bundling 300MB+ into lambdas.
 *
 * Prerequisite: run `npm run compress-images` first to convert PNGs → WebP
 * under public/images/projects (or run both via `npm run prepare-images`).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "public", "images", "projects");
const OUT = path.join(__dirname, "..", "lib", "portfolio-manifest.json");

const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;

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

function excerptForCategory(category) {
  return "open the preview to browse the full set.";
}

/** Public URL (encoded path segments) under /images/projects/ */
function publicImageUrl(relDir, fileName) {
  const segments = [...relDir.split("/").filter(Boolean), fileName];
  return `/${["images", "projects", ...segments.map((s) => encodeURIComponent(s))].join("/")}`;
}

function scanDir(absPath, relPath) {
  let dirents;
  try {
    dirents = fs.readdirSync(absPath, { withFileTypes: true });
  } catch {
    return [];
  }

  const imageNames = dirents
    .filter((d) => d.isFile() && IMAGE_EXT.test(d.name))
    .map((d) => d.name)
    .sort(naturalSort);

  const subdirs = dirents.filter((d) => d.isDirectory());
  const fromChildren = subdirs.flatMap((d) =>
    scanDir(path.join(absPath, d.name), relPath ? `${relPath}/${d.name}` : d.name)
  );

  if (imageNames.length === 0) return fromChildren;
  if (relPath === "") return fromChildren;

  const folderName = path.basename(relPath);
  const images = imageNames.map((name) => publicImageUrl(relPath, name));
  const category = categoryFromRel(relPath);

  const item = {
    title: titleFromFolder(folderName),
    excerpt: excerptForCategory(category),
    category,
    coverImage: images[0],
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

function main() {
  if (!fs.existsSync(ROOT)) {
    fs.writeFileSync(OUT, "[]\n", "utf8");
    console.warn(
      "[generate-portfolio-manifest] public/images/projects not found; wrote empty []. " +
        "Move assets/images/projects → public/images/projects to populate the portfolio."
    );
    return;
  }

  const items = scanDir(ROOT, "");
  items.sort((a, b) => categorySortKey(a.category) - categorySortKey(b.category));
  fs.writeFileSync(OUT, JSON.stringify(items, null, 2) + "\n", "utf8");
  console.log(`[generate-portfolio-manifest] wrote ${items.length} item(s) → lib/portfolio-manifest.json`);
}

main();
