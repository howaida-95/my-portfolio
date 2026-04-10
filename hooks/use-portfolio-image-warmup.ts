"use client";

import { useEffect } from "react";

import type { PortfolioItem } from "@/lib/portfolio-types";
import { scheduleIdle, warmImageCache, warmImageCacheMany } from "@/lib/warm-image-cache";

const PRIORITY_TILES = 6;
/** Extra shots to pull during idle (beyond cover) per project — rest load on hover / in carousel. */
const IDLE_GALLERY_DEPTH = 3;

/**
 * Pre-warm cover images immediately, remaining covers on idle, then first few slides per project.
 * Full galleries warm on tile hover and via carousel neighbor preloads.
 */
export function usePortfolioImageWarmup(items: readonly PortfolioItem[]) {
  useEffect(() => {
    if (items.length === 0) return;

    const covers = items.map((i) => i.coverImage);
    covers.slice(0, PRIORITY_TILES).forEach((src) => warmImageCache(src));

    scheduleIdle(() => {
      warmImageCacheMany(covers.slice(PRIORITY_TILES));
    });

    scheduleIdle(() => {
      for (const item of items) {
        warmImageCacheMany(item.images.slice(0, IDLE_GALLERY_DEPTH));
      }
    });
  }, [items]);
}
