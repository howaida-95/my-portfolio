"use client";

import { useEffect } from "react";

import type { PortfolioItem } from "@/lib/portfolio-types";
import { scheduleIdle, warmImageCache } from "@/lib/warm-image-cache";

const PRIORITY_TILES = 3;

/**
 * Pre-warm only cover thumbnails:
 *  - First 3 immediately (above the fold)
 *  - Remaining covers on idle, staggered in small batches to avoid flooding
 *
 * Gallery images are NOT preloaded here — they warm on tile hover (capped)
 * and via carousel neighbor preloads. This keeps the network free for the
 * content the user actually sees first.
 */
export function usePortfolioImageWarmup(items: readonly PortfolioItem[]) {
  useEffect(() => {
    if (items.length === 0) return;

    const covers = items.map((i) => i.coverImage);
    covers.slice(0, PRIORITY_TILES).forEach((src) => warmImageCache(src));

    const rest = covers.slice(PRIORITY_TILES);
    const BATCH = 4;
    for (let i = 0; i < rest.length; i += BATCH) {
      const batch = rest.slice(i, i + BATCH);
      scheduleIdle(() => batch.forEach((src) => warmImageCache(src)));
    }
  }, [items]);
}
