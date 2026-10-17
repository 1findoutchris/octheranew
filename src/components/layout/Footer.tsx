import Link from "next/link";
import { footerNav, siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { OctheraLogo } from "@/components/ui/OctheraLogo";

/**
 * Company identity and legal links are deliberately absent until the owner
 * supplies verified details (docs/owner-decisions.md §1); /privacy and
 * /terms do not exist yet, so nothing links to them.
 */
export function Footer() {
  return (
    <footer id="site-footer" className="border-t border-border bg-surface">
      <Container className="section-y">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <OctheraLogo href="/" size="md" />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              B2B casino aggregation, sportsbook, white-label and turnkey technology for licensed
              operators.
            </p>
            <h2 className="mt-6 text-sm font-semibold text-foreground">Contact sales</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a href={`mailto:${siteConfig.salesEmail}`} className="link-inline">
                  {siteConfig.salesEmail}
                </a>
              </li>
              <li>
                <a href={siteConfig.telegram} target="_blank" rel="noopener noreferrer" className="link-inline">
                  Message our team on Telegram
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold text-foreground">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-muted transition-colors hover:text-foreground hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:items-start sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
          <p className="max-w-xl leading-relaxed">
            Octhera provides business-to-business gaming technology to licensed operators and does
            not offer gambling services to consumers. Operators are responsible for holding
            applicable licences and complying with local regulations, including responsible-gambling
            requirements, in their markets.
          </p>
        </div>
      </Container>
    </footer>
  );
}
