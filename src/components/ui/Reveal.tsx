import { cn } from "@/lib/cn";

/** Wraps content in the single short CSS entrance (see `.reveal` in globals.css). */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  id?: string;
}) {
  const Component = Tag as React.ElementType;

  return (
    <Component id={id} className={cn("reveal", className)}>
      {children}
    </Component>
  );
}
