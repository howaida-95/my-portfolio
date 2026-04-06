"use client";

import { useEffect, useState } from "react";

export function useTypewriter(strings: readonly string[], opts?: { typingMs?: number; deletingMs?: number; pauseMs?: number }) {
  const typingMs = opts?.typingMs ?? 100;
  const deletingMs = opts?.deletingMs ?? 50;
  const pauseMs = opts?.pauseMs ?? 2000;

  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = strings[index] ?? "";
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && sub === full) {
      t = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && sub.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % strings.length);
    } else if (deleting) {
      t = setTimeout(() => setSub((s) => s.slice(0, -1)), deletingMs);
    } else {
      t = setTimeout(() => setSub(full.slice(0, sub.length + 1)), typingMs);
    }

    return () => clearTimeout(t);
  }, [strings, index, sub, deleting, typingMs, deletingMs, pauseMs]);

  return sub;
}
