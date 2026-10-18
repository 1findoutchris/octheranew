import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { products } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BuyerRoutes } from "@/components/home/BuyerRoutes";
import { PackageComparison } from "@/components/sections/PackageComparison";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = pageMetadata({
  title: "B2B iGaming Products for Casino & Sportsbook Operators",
  description:
    "Octhera's B2B iGaming products: casino aggregator, casino API, sportsbook, turnkey, white label, back office, payments and affiliate system. Compare what each one is for.",
  path: "/products",
});

const comparison = [
  {
    name: "Casino Aggregator",
    href: "/products/casino-aggregator",
    platform: "Yes, your own",
    connect: "One launch endpoint and one signed wallet callback (the Casino API)",
    wallet: "Your platform holds balances",
    route: "Game Aggregation API plan; included in White Label and Turnkey",
  },
  {
    name: "Sportsbook",
    href: "/products/sportsbook",
    platform: "Your own, or Turnkey",
    connect: "Integration method confirmed during discovery",
    wallet: "Confirmed during discovery",
    route: "Included in Turnkey; standalone pricing quoted",
  },
  {
    name: "White Label",
    href: "/products/white-label",
    platform: "No, a ready-made platform is provided",
    connect: "Branded deployment of the Octhera platform",
    wallet: "Confirmed per package",
    route: "White Label plan",
  },
  {
    name: "Turnkey",
    href: "/products/turnkey-casino",
    platform: "No, the full stack is provided",
    connect: "Casino, sportsbook, back office, payments and affiliate tools",
    wallet: "Confirmed per package",
    route: "Turnkey plan",
  },
];

const coreSlugs = ["casino-aggregator", "casino-api", "sportsbook", "white-label", "turnkey-casino"];

export default function ProductsPage() {
  const modules = products.filter((p) => !coreSlugs.includes(p.slug));
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Choose the route that fits your platform"
        description="Start from where you are today: an existing platform that needs content, a new brand that needs a platform, or an operator adding sports betting."
      />

      <section className="theme-light section-y" aria-labelledby="routes-heading">
        <Container>
          <SectionHeading id="routes-heading" title="Buyer routes" />
          <div className="mt-8">
            <BuyerRoutes />
          </div>
        </Container>
      </section>

      <section className="theme-light section-y border-t border-border" aria-labelledby="compare-heading">
        <Container>
          <SectionHeading
            id="compare-heading"
            title="How each product connects"
            description="The Casino API is the developer view of the casino aggregator, not a separate content service."
          />
          <div className="mt-8 overflow-x-auto rounded-xl border border-border" role="region" aria-labelledby="compare-heading" tabIndex={0}>
            <table className="w-full min-w-[760px] text-left text-base">
              <thead className="bg-surface text-foreground">
                <tr>
                  <th scope="col" className="p-4 font-semibold">Product</th>
                  <th scope="col" className="p-4 font-semibold">Platform needed?</th>
                  <th scope="col" className="p-4 font-semibold">How it connects</th>
                  <th scope="col" className="p-4 font-semibold">Player balances</th>
                  <th scope="col" className="p-4 font-semibold">Commercial route</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-elevated text-muted">
                {comparison.map((row) => (
                  <tr key={row.name}>
                    <th scope="row" className="p-4 font-medium">
                      <Link href={row.href} className="link-inline">
                        {row.name}
                      </Link>
                    </th>
                    <td className="p-4">{row.platform}</td>
                    <td className="p-4">{row.connect}</td>
                    <td className="p-4">{row.wallet}</td>
                    <td className="p-4">{row.route}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section id="packages" className="theme-light section-y border-t border-border scroll-mt-20" aria-labelledby="packages-heading">
        <Container>
          <SectionHeading
            id="packages-heading"
            title="White Label or Turnkey?"
            description="Both are platform packages for operators without their own stack. This comparison uses only what each published plan lists."
          />
          <div className="mt-8">
            <PackageComparison />
          </div>
        </Container>
      </section>

      <section className="section-y" aria-labelledby="modules-heading">
        <Container>
          <SectionHeading
            id="modules-heading"
            title="Supporting modules"
            description="Operational tooling that is part of the platform packages. Ask sales whether a module is available on its own."
          />
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {modules.map((product) => (
              <li key={product.slug}>
                <Link href={`/products/${product.slug}`} className="card-surface card-glow flex h-full flex-col rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                  <p className="mt-2 flex-1 text-base text-muted">{product.description}</p>
                  <span className="mt-4 text-base font-medium text-foreground underline underline-offset-4">
                    View {product.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection
        title="Not sure which route fits?"
        description="Tell us about your platform and markets and we'll help you map the right combination."
      />
    </>
  );
}
