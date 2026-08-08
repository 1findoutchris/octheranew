import Link from "next/link";
import { footerNav, siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { OctheraLogo } from "@/components/ui/OctheraLogo";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-border to-transparent" />
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <OctheraLogo href="/" size="md" />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Powering the Future of Gaming. Octhera provides B2B casino
              aggregation, sportsbook, turnkey and white-label infrastructure
              for operators building the next generation of gaming brands.
            </p>
            <div className="mt-6">
              <Button href="/contact" size="md" showArrow>
                Talk to Sales
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-primary-bright"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="max-w-xl leading-relaxed">
            Octhera provides business-to-business gaming technology to
            licensed operators. Octhera does not offer gambling services
            directly to consumers. Operators are responsible for holding
            applicable licenses and complying with local regulations,
            including responsible-gambling requirements, in their markets.
          </p>
        </div>
      </Container>
    </footer>
  );
}
