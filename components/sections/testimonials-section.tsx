"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { TESTIMONIALS } from "@/lib/site-content";
import { cn } from "@/lib/utils";

import { SectionContainer } from "./section-container";
import { SectionTitle } from "./section-title";

const TESTIMONIALS_INTRO =
  "Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit";

export function TestimonialsSection() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i] ?? TESTIMONIALS[0];
  const n = TESTIMONIALS.length;

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 bg-secondary/30 py-14 sm:py-16 lg:scroll-mt-8 lg:py-20"
    >
      <SectionContainer>
        <SectionTitle title="Testimonials" description={TESTIMONIALS_INTRO} />
        <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8 md:p-10 lg:mx-auto lg:max-w-4xl">
          <Quote className="h-8 w-8 text-primary/40 sm:h-10 sm:w-10" aria-hidden />
          <p className="mt-4 text-base italic text-muted-foreground sm:text-lg">
            &ldquo;{t.quote}&rdquo;
          </p>
          <p className="mt-4 text-sm text-muted-foreground sm:mt-6 sm:text-base">{t.detail}</p>
          <div className="mt-6">
            <p className="font-display text-lg font-semibold sm:text-xl">{t.name}</p>
            <p className="text-sm text-primary">{t.role}</p>
          </div>

          <div className="mt-6 flex flex-col items-stretch gap-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="hidden sm:inline-flex"
              onClick={() => setI((v) => (v - 1 + n) % n)}
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="order-first flex flex-wrap justify-center gap-2 sm:order-none">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setI(idx)}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-colors",
                    idx === i ? "bg-primary" : "bg-muted"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="hidden sm:inline-flex"
              onClick={() => setI((v) => (v + 1) % n)}
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-4 flex justify-center gap-3 sm:hidden">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setI((v) => (v - 1 + n) % n)}
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setI((v) => (v + 1) % n)}
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
