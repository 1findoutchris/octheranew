import { homeStats } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedStat } from "@/components/ui/AnimatedStat";

export function StatsSection() {
  return (
    <section className="relative border-y border-border bg-surface py-14">
      <Container>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {homeStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="text-center sm:text-left">
              <AnimatedStat
                value={stat.value}
                className="block text-3xl font-semibold tracking-tight text-gradient-accent sm:text-4xl"
              />
              <span className="mt-1 block text-sm text-muted">{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
