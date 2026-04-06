"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[], offset = 120) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const onScroll = () => {
      const pos = window.scrollY + offset;
      let current = sectionIds[0] ?? "";
      for (const el of elements) {
        if (!el.id) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (pos >= top && pos < bottom) {
          current = el.id;
          break;
        }
        if (pos >= top) {
          current = el.id;
        }
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, offset]);

  return activeId;
}
