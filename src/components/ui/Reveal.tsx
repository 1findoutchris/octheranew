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
  const Component = Tag as React.ElementType;

  return (
    <Component
      id={id}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
      className={cn("reveal", className)}
    >
      {children}
    </Component>
  );
}
