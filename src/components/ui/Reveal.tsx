"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      id={id}
      style={visible && delay ? { animationDelay: `${delay}ms` } : undefined}
      className={cn("reveal", visible && "is-visible", className)}
    >
      {children}
    </Component>
  );
}
