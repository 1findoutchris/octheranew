"use client";

import { useEffect, useRef, useState } from "react";

function splitValue(value: string) {
  const match = value.match(/^([\d,]+)(.*)$/);
  if (!match) return { hasNumber: false as const, target: 0, prefix: "", suffix: value };
  const target = Number(match[1].replace(/,/g, ""));
  if (Number.isNaN(target)) return { hasNumber: false as const, target: 0, prefix: "", suffix: value };
  return { hasNumber: true as const, target, prefix: "", suffix: match[2] };
}

export function AnimatedStat({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const parsed = splitValue(value);
  const [display, setDisplay] = useState<string>(() =>
    parsed.hasNumber ? `0${parsed.suffix}` : value
  );

  useEffect(() => {
    const node = ref.current;
    const { hasNumber, target, suffix } = splitValue(value);
    if (!node || !hasNumber) return;

    let frame: number;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();

          const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (reducedMotion) {
            setDisplay(value);
            return;
          }

          const duration = 1400;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            setDisplay(`${current.toLocaleString("en-US")}${suffix}`);
            if (progress < 1) {
              frame = requestAnimationFrame(tick);
            }
          };

          frame = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
