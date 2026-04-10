import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { ABOUT, ABOUT_INTRO, SITE } from "@/lib/site-content";

import { SectionContainer } from "./section-container";
import { SectionTitle } from "./section-title";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-14 sm:py-16 lg:scroll-mt-8 lg:py-20"
    >
      <SectionContainer>
        <SectionTitle title="About" description={ABOUT_INTRO} />
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="mx-auto w-full max-w-md lg:col-span-4 lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-md">
              <Image
                src={SITE.profileImage}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 448px, 100vw"
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              {SITE.tagline}
            </h3>
            <p className="mt-3 italic text-muted-foreground">{ABOUT.lead}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <ul className="space-y-2 text-sm">
                {ABOUT.factsLeft.map((row) => (
                  <li key={row.label} className="flex items-start gap-2">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      <strong className="text-foreground">{row.label}:</strong>{" "}
                      <span className="text-muted-foreground">{row.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2 text-sm">
                {ABOUT.factsRight.map((row) => (
                  <li key={row.label} className="flex items-start gap-2">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      <strong className="text-foreground">{row.label}:</strong>{" "}
                      <span className="text-muted-foreground">{row.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 text-muted-foreground">{ABOUT.closing}</p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
