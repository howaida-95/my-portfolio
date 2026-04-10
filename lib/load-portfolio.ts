import fs from "fs";
import path from "path";

import type { PortfolioCategory, PortfolioItem } from "@/lib/portfolio-types";

/**
 * Discovers project folders under assets/images/projects. Image URLs are served
 * by app/api/project-images/[...path]/route.ts from that same tree (single source
 * of truth; no need to duplicate files under public/).
 */
const ASSETS_PROJECTS = path.join(process.cwd(), "assets", "images", "projects");

const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;

function naturalSort(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

/** URL path segments after /api/project-images/, each encoded. */
export function projectImageUrl(relDir: string, fileName: string): string {
  const segments = [...relDir.split("/").filter(Boolean), fileName];
  return `/api/project-images/${segments.map(encodeURIComponent).join("/")}`;
}

function categoryFromRel(relPath: string): PortfolioCategory {
  if (relPath.startsWith("1-Web Applications")) return "Web Applications";
  if (relPath.startsWith("2- E-Commerce websites")) return "E-Commerce Solutions";
  if (relPath.startsWith("3-Mobile Applications")) return "Mobile Applications";
  return "Mobile Applications";
}

function excerptForCategory(category: PortfolioCategory): string {
  if (category === "Mobile Applications") {
    return "open the preview to browse the full set.";
  }
  return "open the preview to browse the full set.";
}

function titleFromFolder(folderName: string): string {
  const stripped = folderName.replace(/^\d+-/, "");
  return stripped
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function scanDir(absPath: string, relPath: string): PortfolioItem[] {
  let dirents: fs.Dirent[];
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

  // Root of projects (e.g. profile.jpg) is not a portfolio tile
  if (relPath === "") return fromChildren;

  const folderName = path.basename(relPath);
  const images = imageNames.map((name) => projectImageUrl(relPath, name));

  const category = categoryFromRel(relPath);
  const item: PortfolioItem = {
    title: titleFromFolder(folderName),
    excerpt: excerptForCategory(category),
    category,
    coverImage: images[0],
    images,
  };

  return [item, ...fromChildren];
}

const CATEGORY_ORDER: PortfolioCategory[] = [
  "Web Applications",
  "E-Commerce Solutions",
  "Mobile Applications",
];

function categorySortKey(category: PortfolioCategory): number {
  const i = CATEGORY_ORDER.indexOf(category);
  return i === -1 ? CATEGORY_ORDER.length : i;
}

export function getPortfolioItems(): PortfolioItem[] {
  if (!fs.existsSync(ASSETS_PROJECTS)) return [];
  const items = scanDir(ASSETS_PROJECTS, "");
  /** Stable order: web → e-commerce → mobile; within each, filesystem discovery order. */
  return items.sort(
    (a, b) => categorySortKey(a.category) - categorySortKey(b.category)
  );
}
