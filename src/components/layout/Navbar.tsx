"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-18 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            OCT<span className="text-gradient-accent">HERA</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute inset-x-4 -bottom-px h-px dot-active" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" size="md">
            Talk to Sales
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex size-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="size-5" />
        </button>
      </Container>

      <div
        className={cn(
          "grid overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl transition-[grid-template-rows] duration-300 ease-out lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
                className={cn(
                  "rounded-xl px-4 py-3 text-base font-medium transition-all duration-300",
                  open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
                  isActive(item.href)
                    ? "bg-primary-soft text-foreground"
                    : "text-muted hover:bg-elevated hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 px-4">
              <Button href="/contact" size="md" className="w-full">
                Talk to Sales
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
