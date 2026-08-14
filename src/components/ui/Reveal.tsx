"use client";

import { useEffect, useState } from "react";
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const Component = Tag as React.ElementType;

  return (
    <Component
      id={id}
      style={visible && delay ? { animationDelay: `${delay}ms` } : undefined}
      className={cn("reveal", visible && "is-visible", className)}
    >
      {children}
    </Component>
  );
}
