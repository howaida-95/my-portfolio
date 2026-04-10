import { SKILLS } from "@/lib/site-content";

import { SectionContainer } from "./section-container";
import { SectionTitle } from "./section-title";

const SKILLS_INTRO =
` 
  My core stack, plus the tools I rely on to design, ship, and maintain quality frontend products.
`
export function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 bg-gradient-to-b from-secondary/25 via-background to-secondary/20 py-16 sm:py-20 lg:scroll-mt-8 lg:py-24"
    >
      <SectionContainer>
        <SectionTitle title="Skills" description={SKILLS_INTRO} />
        <div className="mx-auto max-w-4xl">
          <ul className="flex flex-wrap justify-center gap-x-2.5 gap-y-3 sm:gap-x-3 sm:gap-y-3.5">
            {SKILLS.map((name) => (
              <li key={name}>
                <span
                  className="inline-flex cursor-default items-center rounded-full border border-border/40 bg-card/60 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur-sm transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:border-primary/30 hover:bg-primary/[0.07] hover:text-foreground hover:shadow-md sm:px-5 sm:py-2.5 sm:text-[0.9375rem]"
                >
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </SectionContainer>
    </section>
  );
}
