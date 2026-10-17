import Link from "next/link";
import { contactHref } from "@/lib/contact-context";

export const buyerRoutes = [
  {
    id: "add-casino-content",
    title: "Add casino content to your platform",
    summary: "Connect once to aggregated studio content and keep your own lobby, accounts and wallet.",
    prerequisite: "Your own platform with player accounts, a wallet and a public HTTPS callback endpoint.",
    staysWithYou: "Player balances, your licences and your frontend.",
    primary: { label: "View casino aggregator", href: "/products/casino-aggregator" },
    secondary: { label: "View API guide", href: "/docs" },
  },
  {
    id: "launch-a-brand",
    title: "Launch a branded platform",
    summary: "Start on a ready-made White Label platform or the fuller Turnkey stack instead of assembling one.",
    prerequisite: "A gaming licence for each market you plan to serve.",
    staysWithYou:
      "Licensing and regulatory compliance. The rest of the responsibility split is agreed per package during discovery.",
    primary: { label: "Compare white label and turnkey", href: "/products#packages" },
    secondary: { label: "Request a walkthrough", href: contactHref({ request: "walkthrough", product: "white-label" }) },
  },
  {
    id: "add-sports-betting",
    title: "Add sports betting",
    summary: "Pre-match and live betting with configurable odds and margins, on your platform or as part of Turnkey.",
    prerequisite: "A licence that covers sports betting in each market you serve.",
    staysWithYou: "Which sports and markets you offer, your margins and risk appetite, and compliance.",
    primary: { label: "View sportsbook", href: "/products/sportsbook" },
    secondary: { label: "Request a sportsbook walkthrough", href: contactHref({ request: "walkthrough", product: "sportsbook" }) },
  },
];

/** Three starting situations, each with its prerequisite and what stays with the operator. */
export function BuyerRoutes({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="grid gap-5 lg:grid-cols-3">
      {buyerRoutes.map((route) => (
        <li key={route.id} id={route.id} className="card-surface flex flex-col rounded-xl p-5 md:p-6">
          <Heading className="type-h3 text-foreground">{route.title}</Heading>
          <p className="mt-3 text-base text-muted">{route.summary}</p>
          <dl className="mt-5 flex-1 space-y-4 text-base">
            <div>
              <dt className="text-sm font-semibold text-foreground">You need</dt>
              <dd className="mt-1 text-muted">{route.prerequisite}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-foreground">Stays with you</dt>
              <dd className="mt-1 text-muted">{route.staysWithYou}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-col gap-3">
            <Link href={route.primary.href} className="btn-primary inline-flex min-h-11 items-center justify-center rounded-xl px-5 text-base font-medium">
              {route.primary.label}
            </Link>
            <Link href={route.secondary.href} className="link-inline self-start text-base">
              {route.secondary.label}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
