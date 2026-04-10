import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Bootstrap-style centered container (see tailwind `theme.container`).
 * Use inside each `<section>` except the full-bleed hero.
 */
export function SectionContainer({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("container", className)}>{children}</div>;
}
