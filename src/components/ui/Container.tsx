import { cn } from "@/lib/cn";

/** Max 1200px content width; 20px side padding on mobile, 24px from tablet up. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1248px] px-5 md:px-6", className)}>
      {children}
    </div>
  );
}
