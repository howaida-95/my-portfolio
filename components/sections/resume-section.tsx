import { RESUME } from "@/lib/site-content";

import { SectionContainer } from "./section-container";
import { SectionTitle } from "./section-title";

const RESUME_INTRO =
  "A concise overview of my professional path—roles, impact, and the technologies I have delivered with.";

export function ResumeSection() {
  return (
    <section
      id="resume"
      className="scroll-mt-24 py-14 sm:py-16 lg:scroll-mt-8 lg:py-20"
    >
      <SectionContainer>
        <SectionTitle title="Resume" description={RESUME_INTRO} />
        <div className="">

          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              Professional Experience
            </h3>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {RESUME.experience.map((ex) => (
                <div key={ex.title} className="relative mt-4 border-l-2 border-primary/40 pl-5 sm:pl-6">
                  <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                  <h4 className="font-display text-lg font-semibold">{ex.title}</h4>
                  <p className="text-sm font-semibold text-primary">{ex.years}</p>
                  <p className="text-sm italic text-muted-foreground">{ex.company}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                    {ex.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
