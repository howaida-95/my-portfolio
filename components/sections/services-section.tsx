import {
  BarChart3,
  Binoculars,
  Briefcase,
  Calendar,
  ClipboardList,
  Sun,
} from "lucide-react";
import Link from "next/link";

import { SERVICES } from "@/lib/site-content";

import { SectionContainer } from "./section-container";
import { SectionTitle } from "./section-title";

const ICONS = {
  briefcase: Briefcase,
  list: ClipboardList,
  chart: BarChart3,
  binoculars: Binoculars,
  sun: Sun,
  calendar: Calendar,
} as const;

const SERVICES_INTRO = "Here's what I bring to the table — the areas where I can add the most value to your project or team."
export function ServicesSection() {
  return (
    <section
      id="services"
      className="scroll-mt-24 py-14 sm:py-16 lg:scroll-mt-8 lg:py-20"
    >
      <SectionContainer>
        <SectionTitle title="Services" description={SERVICES_INTRO} />
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <div
                key={s.title}
                className="relative flex gap-4 rounded-lg border bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 text-primary sm:h-14 sm:w-14">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold sm:text-lg">
                    <Link
                      href="/services/details"
                      className="after:absolute after:inset-0 hover:text-primary"
                    >
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
