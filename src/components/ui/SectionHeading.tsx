import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  /** id for the H2, so sections can be labelled with aria-labelledby. */
  id?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-bright">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={cn("type-h2", eyebrow && "mt-3", align === "center" && "mx-auto")}>
        {title}
      </h2>
      {description && (
        <p className={cn("type-lead mt-4 text-muted", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
