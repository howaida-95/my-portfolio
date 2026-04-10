/**
 * Deduped client-side image warm-up (decode into browser cache).
 * Safe to call from effects / event handlers; no-ops on the server.
 */
const warmed = new Set<string>();

export function warmImageCache(src: string): void {
  if (typeof window === "undefined" || !src || warmed.has(src)) {
    return;
  }
  warmed.add(src);
  const img = new Image();
  img.src = src;
}

export function warmImageCacheMany(urls: readonly string[]): void {
  for (const u of urls) {
    warmImageCache(u);
  }
}

export function scheduleIdle(fn: () => void): void {
  if (typeof window === "undefined") {
    return;
  }
  const ric = window.requestIdleCallback;
  if (typeof ric === "function") {
    ric(() => fn(), { timeout: 2500 });
  } else {
    window.setTimeout(fn, 200);
  }
}
