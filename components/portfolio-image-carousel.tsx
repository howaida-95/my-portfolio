"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { warmImageCache } from "@/lib/warm-image-cache";

type Props = {
  images: readonly string[];
  /** When true, resets to the first slide (e.g. modal just opened). */
  active?: boolean;
  enableKeyboard?: boolean;
  priority?: boolean;
  /** Dark: for modal on black. Light: for case-study page on card background. */
  theme?: "dark" | "light";
  /**
   * Full viewport image area with wheel / pinch / drag zoom and pan.
   * Use inside a fullscreen dialog for previews.
   */
  variant?: "inline" | "fullscreen";
};

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const WHEEL_SENS = 0.0015;

function touchDistance(a: { clientX: number; clientY: number }, b: { clientX: number; clientY: number }) {
  const dx = a.clientX - b.clientX;
  const dy = a.clientY - b.clientY;
  return Math.hypot(dx, dy);
}

export function PortfolioImageCarousel({
  images,
  active = true,
  enableKeyboard = true,
  priority = false,
  theme = "dark",
  variant = "inline",
}: Props) {
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, panX: 0, panY: 0 });
  const pinchRef = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const count = images.length;
  const isFullscreen = variant === "fullscreen";

  // Avoid rendering one dot per image for large sets.
  // Shows a sliding window of dots that always includes the current `index`.
  const MAX_DOTS = 5;
  const dotIndices = useMemo(() => {
    if (count <= MAX_DOTS) return Array.from({ length: count }, (_, i) => i);
    const half = Math.floor(MAX_DOTS / 2);
    const start = Math.max(0, Math.min(count - MAX_DOTS, index - half));
    return Array.from({ length: MAX_DOTS }, (_, i) => start + i);
  }, [count, index]);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (active) {
      setIndex(0);
      resetZoom();
    }
  }, [active, resetZoom, count, images]);

  useEffect(() => {
    resetZoom();
  }, [index, resetZoom]);

  useEffect(() => {
    if (!active || count <= 1) return;
    const prevI = (index - 1 + count) % count;
    const nextI = (index + 1) % count;
    warmImageCache(images[prevI]);
    warmImageCache(images[nextI]);
  }, [active, count, index, images]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  useEffect(() => {
    if (!enableKeyboard || count <= 1 || !active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enableKeyboard, count, active, prev, next]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || !isFullscreen || !active) return;
    const onWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY * WHEEL_SENS;
      setScale((s) => {
        const nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s + delta));
        if (nextScale <= MIN_SCALE) setPan({ x: 0, y: 0 });
        return nextScale;
      });
    };
    el.addEventListener("wheel", onWheelNative, { passive: false });
    return () => el.removeEventListener("wheel", onWheelNative);
  }, [isFullscreen, active, index]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || !isFullscreen || !active) return;
    const preventTwoFingerScroll = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    el.addEventListener("touchmove", preventTwoFingerScroll, { passive: false });
    return () => el.removeEventListener("touchmove", preventTwoFingerScroll);
  }, [isFullscreen, active, index]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!isFullscreen || scale <= MIN_SCALE) return;
      // Clicks on prev/next (and any future controls) bubble here; capturing the
      // viewport would steal the pointer and block button activation while zoomed.
      if ((e.target as HTMLElement).closest("button")) return;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      setDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        panX: pan.x,
        panY: pan.y,
      };
    },
    [isFullscreen, scale, pan.x, pan.y]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging || !isFullscreen) return;
      const { startX, startY, panX, panY } = dragRef.current;
      setPan({
        x: panX + e.clientX - startX,
        y: panY + e.clientY - startY,
      });
    },
    [dragging, isFullscreen]
  );

  const onPointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isFullscreen || e.touches.length !== 2) return;
      pinchRef.current = touchDistance(e.touches[0], e.touches[1]);
    },
    [isFullscreen]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isFullscreen || e.touches.length !== 2 || pinchRef.current == null) return;
      const d = touchDistance(e.touches[0], e.touches[1]);
      const factor = d / pinchRef.current;
      pinchRef.current = d;
      setScale((s) => {
        const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * factor));
        if (next <= MIN_SCALE) setPan({ x: 0, y: 0 });
        return next;
      });
    },
    [isFullscreen]
  );

  const onTouchEnd = useCallback(() => {
    pinchRef.current = null;
  }, []);

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(MAX_SCALE, s + 0.35));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((s) => {
      const next = Math.max(MIN_SCALE, s - 0.35);
      if (next <= MIN_SCALE) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const onDoubleClick = useCallback(() => {
    if (!isFullscreen) return;
    if (scale > MIN_SCALE) resetZoom();
    else setScale(2.25);
  }, [isFullscreen, scale, resetZoom]);

  if (count === 0) return null;

  const isDark = theme === "dark";

  const imageViewport = (
    <div
      ref={viewportRef}
      className={cn(
        "touch-none select-none",
        isFullscreen
          ? "absolute inset-0 cursor-grab active:cursor-grabbing"
          : "relative aspect-[16/10] w-full sm:aspect-[16/9] sm:min-h-[min(70vh,520px)]"
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onDoubleClick={onDoubleClick}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          transform: isFullscreen
            ? `translate(${pan.x}px, ${pan.y}px) scale(${scale})`
            : undefined,
          transformOrigin: "center center",
          transition: "none",
        }}
      >
        {/*
          Native img + max-h/w + flex center: next/image fill often mis-sizes in nested
          absolute/flex layouts, which looks like a permanent zoom/crop.
        */}
        <div className="flex h-full min-h-0 w-full min-w-0 items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- dynamic URLs; intrinsic fit beats fill here */}
          <img
            key={images[index]}
            src={images[index]}
            alt=""
            className="pointer-events-none h-auto w-auto max-h-full max-w-full object-contain select-none"
            loading="eager"
            fetchPriority={active ? "high" : priority ? "high" : "auto"}
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className={cn(
              "absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-sm transition-colors sm:left-4",
              isDark
                ? "bg-black/60 text-white hover:bg-primary"
                : "bg-background/90 text-foreground shadow-sm hover:bg-primary hover:text-primary-foreground"
            )}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className={cn(
              "absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-sm transition-colors sm:right-4",
              isDark
                ? "bg-black/60 text-white hover:bg-primary"
                : "bg-background/90 text-foreground shadow-sm hover:bg-primary hover:text-primary-foreground"
            )}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );

  const zoomToolbar =
    isFullscreen && isDark ? (
      <div className="absolute left-3 top-3 z-20 flex items-center gap-1 sm:left-4 sm:top-4">
        <button
          type="button"
          onClick={zoomOut}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={zoomIn}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={resetZoom}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label="Reset zoom"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>
    ) : null;

  if (isFullscreen) {
    return (
      <div className="relative flex min-h-0 w-full flex-1 flex-col bg-black">
        {zoomToolbar}
        <div className="relative h-0 min-h-0 flex-1 overflow-hidden">
          {imageViewport}
        </div>
        {count > 1 && (
          <div className="shrink-0 border-t border-white/10 bg-black/90 px-3 py-3 text-white/90 backdrop-blur-md">
            <p className="mb-2 text-center text-sm">
              {index + 1} / {count}
              <span className="ml-2 text-white/50">
                · Scroll or pinch to zoom · drag when zoomed · double-click to toggle
              </span>
            </p>
          </div>
        )}
        {count === 1 && (
          <div className="shrink-0 border-t border-white/10 bg-black/90 px-3 py-2 text-center text-xs text-white/50">
            Scroll or pinch to zoom · drag when zoomed · double-click to toggle
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg ring-1",
          isDark ? "bg-black/95 ring-white/10" : "bg-muted/40 ring-border"
        )}
      >
        {imageViewport}
      </div>
      {count > 1 && (
        <div
          className={cn(
            "mt-3 flex flex-col items-center gap-2 px-2",
            isDark ? "text-white/80" : "text-muted-foreground"
          )}
        >
          <p className="text-center text-sm">
            {index + 1} / {count}
          </p>
        </div>
      )}
    </div>
  );
}
