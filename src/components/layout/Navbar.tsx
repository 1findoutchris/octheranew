"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { navGroups, type NavGroup } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { OctheraLogo } from "@/components/ui/OctheraLogo";
import { cn } from "@/lib/cn";

function isCurrent(pathname: string, href: string) {
  const path = href.split("#")[0];
  return path === "/" ? pathname === "/" : pathname === path;
}

function groupIsActive(pathname: string, group: NavGroup) {
  if (group.links) return group.links.some((link) => isCurrent(pathname, link.href));
  return pathname.startsWith(group.href);
}

/**
 * Desktop dropdown using the disclosure pattern: a button with aria-expanded
 * controlling a list of links. Opens on click or Enter/Space, closes on
 * Escape (focus returns to the button), outside click or focus leaving.
 */
function DesktopGroup({
  group,
  open,
  onToggle,
  onClose,
  pathname,
}: {
  group: Extract<NavGroup, { links: unknown[] }>;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  pathname: string;
}) {
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          onClose();
          buttonRef.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (open && !wrapperRef.current?.contains(e.relatedTarget as Node | null)) onClose();
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          "inline-flex min-h-11 items-center gap-1 rounded-lg px-3 text-base font-medium transition-colors",
          groupIsActive(pathname, group) ? "text-foreground" : "text-muted hover:text-foreground"
        )}
      >
        {group.label}
        <Icon
          name="chevron-down"
          className={cn("size-4 transition-transform duration-150", open && "rotate-180")}
        />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-border-strong bg-surface p-2 shadow-lg"
      >
        <ul>
          {group.links.map((link) => {
            const current = isCurrent(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  onClick={onClose}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 transition-colors hover:bg-elevated",
                    current && "bg-elevated"
                  )}
                >
                  <span className="block text-base font-medium text-foreground">{link.label}</span>
                  {link.description && (
                    <span className="block text-sm text-muted">{link.description}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuId = useId();

  // Close everything on navigation.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (menuOpen) setMenuOpen(false);
    if (openGroup) setOpenGroup(null);
  }

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setMenuOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  // Outside click closes the desktop dropdown.
  useEffect(() => {
    if (!openGroup) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openGroup]);

  // Mobile menu open: Escape closes and restores focus; the page behind is
  // inert so Tab can't reach hidden content; scroll is locked.
  useEffect(() => {
    if (!menuOpen) return;
    const background = [document.getElementById("main-content"), document.getElementById("site-footer")];
    background.forEach((el) => el?.setAttribute("inert", ""));
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu(true);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      background.forEach((el) => el?.removeAttribute("inert"));
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen, closeMenu]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-18">
        <OctheraLogo href="/" size="md" />

        <nav ref={navRef} aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navGroups.map((group) =>
            group.links ? (
              <DesktopGroup
                key={group.label}
                group={group}
                pathname={pathname}
                open={openGroup === group.label}
                onToggle={() => setOpenGroup((g) => (g === group.label ? null : group.label))}
                onClose={() => setOpenGroup(null)}
              />
            ) : (
              <Link
                key={group.label}
                href={group.href}
                aria-current={isCurrent(pathname, group.href) ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-lg px-3 text-base font-medium transition-colors",
                  isCurrent(pathname, group.href) ? "text-foreground underline underline-offset-8" : "text-muted hover:text-foreground"
                )}
              >
                {group.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" size="md">
            Talk to sales
          </Button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls={mobileMenuId}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border-strong px-3 text-base font-medium text-foreground lg:hidden"
        >
          <Icon name={menuOpen ? "close" : "menu"} className="size-5" />
          Menu
        </button>
      </Container>

      {/* Rendered only while open, so closed links are never focusable. */}
      {menuOpen && (
        <nav
          id={mobileMenuId}
          aria-label="Main"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background lg:hidden"
        >
          <Container className="py-4">
            <ul className="space-y-5">
              {navGroups.map((group) => (
                <li key={group.label}>
                  {group.links ? (
                    <>
                      <p className="px-1 text-sm font-semibold uppercase tracking-[0.12em] text-muted">
                        {group.label}
                      </p>
                      <ul className="mt-1">
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                              onClick={() => closeMenu(false)}
                              className={cn(
                                "flex min-h-11 items-center rounded-lg px-3 text-base font-medium",
                                isCurrent(pathname, link.href)
                                  ? "bg-elevated text-foreground"
                                  : "text-foreground hover:bg-elevated"
                              )}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={group.href}
                      aria-current={isCurrent(pathname, group.href) ? "page" : undefined}
                      onClick={() => closeMenu(false)}
                      className={cn(
                        "flex min-h-11 items-center rounded-lg px-3 text-base font-semibold",
                        isCurrent(pathname, group.href) ? "bg-elevated" : "hover:bg-elevated"
                      )}
                    >
                      {group.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 pb-2">
              <Button href="/contact" size="md" className="w-full">
                Talk to sales
              </Button>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
