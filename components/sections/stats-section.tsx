"use client";

import { FileText, Headphones, Smile, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { STATS } from "@/lib/site-content";

import { SectionContainer } from "./section-container";

const ICONS = {
  smile: Smile,
  file: FileText,
  headset: Headphones,
  users: Users,
} as const;

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const dur = 1200;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          setDisplay(Math.floor(value * t));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

export function StatsSection() {
  return (
    <section
      id="stats"
      className="scroll-mt-24 bg-secondary/50 py-14 sm:py-16 lg:scroll-mt-8 lg:py-20"
    >
      <SectionContainer>
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <div
                key={s.title}
                className="flex flex-col items-center gap-3 rounded-lg border bg-card p-5 text-center shadow-sm sm:p-6"
              >
                <Icon className="h-9 w-9 text-primary sm:h-10 sm:w-10" aria-hidden />
                <span className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                  <AnimatedNumber value={s.end} />
                </span>
                <p className="text-sm text-muted-foreground flex flex-col items-center">
                  <strong className="text-foreground">{s.title}</strong>{" "}
                  <span>{s.subtitle}</span>
                </p>
              </div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
