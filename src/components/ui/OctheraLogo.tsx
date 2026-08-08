import Link from "next/link";
import { cn } from "@/lib/cn";
import { octheraMarkNodes, octheraMarkConnectorPath } from "@/lib/brand";

const sizes = {
  sm: { circle: 28, stroke: 1.5, text: "text-sm" },
  md: { circle: 36, stroke: 1.7, text: "text-xl" },
  lg: { circle: 48, stroke: 1.9, text: "text-2xl" },
} as const;

export type OctheraLogoSize = keyof typeof sizes;

/**
 * The icon-only mark: an orange circle with the Octhera node symbol
 * centered inside it. Used standalone (favicon-adjacent contexts) or
 * combined with the wordmark via OctheraLogo.
 */
export function OctheraMark({
  size = "md",
  className,
}: {
  size?: OctheraLogoSize;
  className?: string;
}) {
  const { circle, stroke } = sizes[size];
  const iconSize = circle * 0.56;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-bright shadow-[0_4px_18px_-4px_var(--color-primary-glow)]",
        className
      )}
      style={{ width: circle, height: circle }}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={octheraMarkConnectorPath} />
        {octheraMarkNodes.map((node) => (
          <circle key={`${node.cx}-${node.cy}`} cx={node.cx} cy={node.cy} r={node.r} fill="#fff" stroke="none" />
        ))}
      </svg>
    </span>
  );
}

/**
 * The full Octhera logo: circular mark + wordmark. Renders as a link to
 * `href` by default (nav/footer usage); pass href={null} for a static,
 * non-clickable lockup.
 */
export function OctheraLogo({
  href = "/",
  showWordmark = true,
  size = "md",
  className,
}: {
  href?: string | null;
  showWordmark?: boolean;
  size?: OctheraLogoSize;
  className?: string;
}) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <OctheraMark size={size} />
      {showWordmark && (
        <span className={cn("font-bold tracking-tight text-white", sizes[size].text)}>
          OCTHERA
        </span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="Octhera — go to homepage" className="inline-flex items-center">
      {content}
    </Link>
  );
}
