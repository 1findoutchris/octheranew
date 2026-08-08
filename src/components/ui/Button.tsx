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
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

const variants: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "text-foreground hover:text-primary",
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

  const { type = "button", onClick } = props as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
