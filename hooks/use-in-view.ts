"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options?.root, options?.rootMargin, options?.threshold]);

  return { ref, inView };
}
