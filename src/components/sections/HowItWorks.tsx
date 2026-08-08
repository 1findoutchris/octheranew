import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Choose Your Solution",
    description: "Select the product that matches where your business is today — aggregation, white label or full turnkey.",
  },
  {
    number: "02",
    title: "Configure Your Platform",
    description: "Set up branding, back office, bonus rules and player management to match how you operate.",
  },
  {
    number: "03",
    title: "Integrate Providers & Payments",
    description: "Connect your game catalog and payment methods through Octhera's unified integration layer.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Go live with a tested, production-ready environment backed by Octhera's technical team.",
  },
  {
    number: "05",
    title: "Scale",
    description: "Expand markets, add providers and grow your product with infrastructure built to keep up.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Launch with Octhera"
          title="From decision to launch, in five steps"
          description="A clear path for operators and brands to move from selecting a product to running a live, scalable business on Octhera."
        />

        <div className="relative mt-16">
          <div className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-primary via-border to-transparent sm:block lg:left-0 lg:right-0 lg:top-7 lg:h-px lg:w-auto lg:bg-gradient-to-r" />

          <div className="grid gap-8 sm:gap-10 lg:grid-cols-5 lg:gap-6">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 90} className="relative flex gap-5 lg:flex-col lg:gap-0">
                <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl border border-primary-border bg-elevated font-mono text-sm font-semibold text-primary-bright shadow-[0_0_0_6px_var(--color-bg)] lg:size-[52px]">
                  {step.number}
                </div>
                <div className="lg:mt-5">
                  <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
