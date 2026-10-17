"use client";

import { useEffect, useRef, useState } from "react";

/** Only plain counts like "50" or "1,200+" animate; anything else ("24/7", "USD") renders as-is. */
function splitValue(value: string) {
  const match = value.match(/^([\d,]+)(\+?)$/);
  if (!match) return null;
  const target = Number(match[1].replace(/,/g, ""));
  return Number.isNaN(target) ? null : { target, suffix: match[2] };
}

/**
 * Renders the final value on the server so it is present in raw HTML and for
 * users without JavaScript; counting up is a client-only enhancement that is
 * skipped under prefers-reduced-motion. The animated digits are hidden from
 * assistive technology, which reads the final value instead.
 */
export function AnimatedStat({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    const parsed = splitValue(value);
    if (!node || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(`${Math.round(eased * parsed.target).toLocaleString("en-US")}${parsed.suffix}`);
          if (progress < 1) frame = requestAnimationFrame(tick);
          else setDisplay(value);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
