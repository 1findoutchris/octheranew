import type { Metadata } from "next";
import { docCategories } from "@/data/docs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CTASection } from "@/components/sections/CTASection";
import { IntegrationGuide } from "@/components/docs/IntegrationGuide";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Integrate with Octhera: API reference, guides and webhooks for game aggregation, sportsbook, wallet and back office.",
};

const methodStyles: Record<string, string> = {
  GET: "text-primary-bright bg-primary-soft",
  POST: "text-emerald-400 bg-emerald-400/10",
  PUT: "text-amber-400 bg-amber-400/10",
  DELETE: "text-red-400 bg-red-400/10",
};

export default function DocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Documentation"
        title="Everything you need to integrate with Octhera"
        description="API references, guides and webhook events for game aggregation, sportsbook, wallet and back office — one platform, a single set of docs."
      />

      <section className="py-24 lg:py-32">
        <Container>
          <div className="flex flex-col gap-16">
            {docCategories.map((category) =>
              category.slug === "getting-started" ? (
                <Reveal key={category.slug} id={category.slug} className="scroll-mt-28">
                  <IntegrationGuide />
                </Reveal>
              ) : (
                <Reveal
                  key={category.slug}
                  id={category.slug}
                  className="scroll-mt-28 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]"
                >
                  <div>
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary-bright">
                      <Icon name={category.icon} className="size-5" />
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                      {category.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{category.description}</p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <ul className="space-y-3">
                      {category.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2.5 text-sm text-muted">
                          <Icon name="chevron-right" className="mt-0.5 size-4 shrink-0 text-primary-bright" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>

                    {category.endpoints && (
                      <div className="card-surface rounded-2xl p-5">
                        <ul className="space-y-3 font-mono text-xs">
                          {category.endpoints.map((endpoint) => (
                            <li key={endpoint.path} className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2">
                                <span
                                  className={cn(
                                    "rounded-md px-1.5 py-0.5 font-semibold",
                                    methodStyles[endpoint.method]
                                  )}
                                >
                                  {endpoint.method}
                                </span>
                                <span className="text-foreground">{endpoint.path}</span>
                              </div>
                              <p className="font-sans text-xs leading-relaxed text-muted">
                                {endpoint.description}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Reveal>
              )
            )}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="API Access"
        title="Ready to start integrating?"
        description="Talk to our team to get sandbox credentials and access to the full Octhera API reference."
        primaryLabel="Talk to Sales"
        primaryHref="/contact"
        secondaryLabel="Explore Platform"
        secondaryHref="/platform"
      />
    </>
  );
}
