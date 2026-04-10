"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ZoomIn } from "lucide-react";

import { PortfolioImageCarousel } from "@/components/portfolio-image-carousel";
import { usePortfolioImageWarmup } from "@/hooks/use-portfolio-image-warmup";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { PortfolioItem } from "@/lib/portfolio-types";
import { PORTFOLIO_FILTERS } from "@/lib/site-content";
import { cn } from "@/lib/utils";
import { warmImageCacheMany } from "@/lib/warm-image-cache";

import { SectionContainer } from "./section-container";
import { SectionTitle } from "./section-title";

const PORTFOLIO_INTRO =
  "Here's a selection of the projects I've worked on — from financial platforms and market analytics tools to e-commerce systems, KPI dashboards, and React Native mobile apps."
type FilterId = (typeof PORTFOLIO_FILTERS)[number]["id"];

function ProjectTile({
  item,
  tileIndex,
}: {
  item: PortfolioItem;
  tileIndex: number;
}) {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const priority = tileIndex < 3;

  useEffect(() => {
    if (carouselOpen) {
      warmImageCacheMany(item.images);
    }
  }, [carouselOpen, item.images]);

  return (
    <article
      className="group relative overflow-hidden rounded-lg border bg-card shadow-sm"
      onMouseEnter={() => warmImageCacheMany(item.images.slice(0, 4))}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={item.coverImage}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          quality={75}
          placeholder={item.blurDataURL ? "blur" : "empty"}
          blurDataURL={item.blurDataURL || undefined}
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-4">
          <h3 className="font-display text-base font-semibold text-white sm:text-lg">
            {item.title}
          </h3>
          <p className="text-xs text-white/90 sm:text-sm">{item.excerpt}</p>
          <div className="mt-2 flex gap-2 sm:mt-3 sm:gap-3">
            <button
              type="button"
              onClick={() => setCarouselOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-primary sm:h-10 sm:w-10"
              aria-label="Preview all images"
            >
              <ZoomIn className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            {/*<Link
              href={`/portfolio/${encodeURIComponent(item.category)}/${encodeURIComponent(item.title)}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-primary sm:h-10 sm:w-10"
              aria-label="Details"
            >
              <Link2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            */}
          </div>
        </div>
      </div>

      <Dialog open={carouselOpen} onOpenChange={setCarouselOpen}>
        <DialogContent
          className={cn(
            "!flex fixed inset-0 left-0 top-0 z-50 h-[100dvh] max-h-dvh w-full max-w-none translate-x-0 translate-y-0 flex-col overflow-hidden border-0 bg-black p-0 shadow-none",
            "!gap-0 rounded-none sm:max-w-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100",
            "[&>button]:text-white [&>button]:hover:bg-white/15 [&>button]:hover:text-white"
          )}
        >
          <DialogTitle className="sr-only">{item.title}</DialogTitle>
          <div className="flex h-0 min-h-0 flex-1 flex-col overflow-hidden">
            <PortfolioImageCarousel
              images={item.images}
              active={carouselOpen}
              enableKeyboard={carouselOpen}
              priority={carouselOpen}
              theme="dark"
              variant="fullscreen"
            />
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}

export function PortfolioSection({ items }: { items: PortfolioItem[] }) {
  const [filter, setFilter] = useState<FilterId>("all");

  const visible = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((p) => p.category === filter);
  }, [filter, items]);

  usePortfolioImageWarmup(items);

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 bg-secondary/30 py-14 sm:py-16 lg:scroll-mt-8 lg:py-20"
    >
      <SectionContainer>
        <SectionTitle title="Portfolio" description={PORTFOLIO_INTRO} />
        <div className="mb-8 flex flex-wrap gap-2 sm:mb-10">
          {PORTFOLIO_FILTERS.map((f) => (
            <Button
              key={f.id}
              type="button"
              size="sm"
              variant={filter === f.id ? "default" : "outline"}
              onClick={() => setFilter(f.id)}
              className="rounded-full text-xs sm:text-sm"
            >
              {f.label}
            </Button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {visible.map((item, tileIndex) => (
            <ProjectTile
              key={`${item.category}-${item.coverImage}`}
              item={item}
              tileIndex={tileIndex}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
