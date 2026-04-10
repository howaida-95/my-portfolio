"use client";

import Image from "next/image";

import { useTypewriter } from "@/hooks/use-typewriter";
import { SITE } from "@/lib/site-content";

/** Full-bleed hero (no `container`); text is constrained for readability only. */
export function HeroSection() {
  const typed = useTypewriter(SITE.typedRoles);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center lg:min-h-screen"
    >
      <Image
        src={SITE.heroImage}
        alt=""
        fill
        priority
        className="object-cover brightness-[0.35]"
        sizes="100vw"
      />
      <div className="relative z-10 w-full max-w-4xl px-4 text-center text-white sm:px-6 md:px-8">
        <h1 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">{SITE.name}</h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl">
          I&apos;m{" "}
          <span className="border-b-2 border-primary pb-0.5 font-semibold text-primary">
            {typed}
          </span>
          <span className="ml-1 inline-block h-6 w-0.5 animate-pulse bg-primary align-middle sm:h-8" />
        </p>
      </div>
    </section>
  );
}
