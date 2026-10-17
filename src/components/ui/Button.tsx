import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  showArrow?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  /** Shows a pending state and blocks repeat activation. */
  loading?: boolean;
};

// 44px+ targets, 16px labels, 12px radius, 8px gap. Focus ring comes from the
// global :focus-visible rule.
const base =
  "inline-flex items-center justify-center gap-2 rounded-xl text-base font-medium tracking-tight disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:opacity-60";

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5",
  lg: "min-h-12 px-6",
};

const variants: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "text-foreground underline-offset-4 hover:underline",
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    showArrow,
  } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  const content = (
    <>
      {children}
      {showArrow && <Icon name="arrow-right" className="size-4 shrink-0" />}
    </>
  );

  if ("href" in props && props.href) {
    if (props.href.startsWith("mailto:")) {
      return (
        <a href={props.href} className={classes}>
          {content}
        </a>
      );
    }
    if (props.external) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  const { type = "button", onClick, disabled, loading } = props as ButtonAsButton;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      className={classes}
      onClickCapture={loading ? (e) => e.preventDefault() : undefined}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="size-4 rounded-full border-2 border-current border-r-transparent motion-safe:animate-spin"
        />
      )}
      {children}
      {showArrow && !loading && <Icon name="arrow-right" className="size-4 shrink-0" />}
    </button>
  );
}
