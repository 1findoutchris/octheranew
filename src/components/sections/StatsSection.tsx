import { catalogTotals, directoryProviderCount } from "@/data/catalog";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedStat } from "@/components/ui/AnimatedStat";

type Stat = { value: string; label: string };

/**
 * Facts the site can back up. Catalog totals appear only once confirmed in
 * src/data/catalog.ts; until then the directory size is shown with its scope.
 */
function getStats(): Stat[] {
  const catalog: Stat[] =
    catalogTotals.providerCount && catalogTotals.gameCount
      ? [
          { value: catalogTotals.providerCount, label: "Game providers" },
          { value: catalogTotals.gameCount, label: "Games" },
        ]
      : [{ value: String(directoryProviderCount), label: "Studios in our provider directory" }];

  return [
    ...catalog,
    { value: "1 API", label: "Game launch and seamless wallet" },
    { value: "HMAC", label: "SHA-256 signed wallet callbacks" },
    { value: "USD", label: "Published launch pricing" },
  ].slice(0, 4);
}

export function StatsSection() {
  const stats = getStats();
  return (
    <section className="relative border-y border-border bg-surface py-14">
      <Container>
        <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="flex flex-col-reverse text-center sm:text-left">
              <dt className="mt-1 block text-sm text-muted">{stat.label}</dt>
              <dd>
                <AnimatedStat
                  value={stat.value}
                  className="block text-3xl font-semibold tracking-tight text-gradient-accent sm:text-4xl"
                />
              </dd>
            </Reveal>
          ))}
        </dl>
        {catalogTotals.scope && (
          <p className="mt-6 text-xs text-muted">{catalogTotals.scope}</p>
        )}
      </Container>
    </section>
  );
}
