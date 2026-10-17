import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";

const reasons: { icon: IconName; title: string; description: string }[] = [
  { icon: "bolt", title: "Documented Integration", description: "One launch endpoint and one signed wallet callback, with sandbox credentials to test before go-live." },
  { icon: "globe", title: "Multi-Studio Content", description: "Studios across slots, live casino, crash and more through one connection, confirmed for your markets." },
  { icon: "puzzle", title: "Modular Architecture", description: "Take the whole platform or just the pieces you need — aggregation, payments, back office." },
  { icon: "sliders", title: "Operator Control", description: "Configure bonuses, limits, risk rules and player management the way your business runs." },
  { icon: "server", title: "Scalable Infrastructure", description: "Built to handle growth in traffic, transactions and markets without re-platforming." },
  { icon: "headset", title: "Dedicated Support", description: "A technical team available to support integration and day-to-day operations." },
];

export function WhyOcthera() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Why Octhera"
          title="What operators get with Octhera"
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <Reveal
              key={reason.title}
              delay={i * 70}
              className="card-surface rounded-2xl p-6"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary-bright">
                <Icon name={reason.icon} className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{reason.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
