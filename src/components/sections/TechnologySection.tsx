import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";

const technologies: { icon: IconName; title: string; description: string }[] = [
  { icon: "api", title: "REST API", description: "A predictable, well-documented API surface for integrating every Octhera product." },
  { icon: "lock", title: "Secure Authentication", description: "Token-based authentication and scoped access for every integration." },
  { icon: "layers", title: "Unified Integration Layer", description: "One integration layer across games, payments and platform services." },
  { icon: "activity", title: "Real-Time Data", description: "Live game rounds, transactions and player events as they happen." },
  { icon: "server", title: "Scalable Infrastructure", description: "Infrastructure designed to grow with transaction volume and traffic." },
  { icon: "webhook", title: "Webhooks", description: "Event-driven webhooks to keep your systems in sync automatically." },
  { icon: "bar-chart", title: "Reporting", description: "Structured reporting data for finance, compliance and operations." },
];

const codeLines = [
  { indent: 0, text: "POST /v1/games/launch" },
  { indent: 0, text: "{" },
  { indent: 1, text: '"operatorId": "op_live_xxxxxxx",' },
  { indent: 1, text: '"playerId": "player_xxxxxxx",' },
  { indent: 1, text: '"provider": "provider_slug",' },
  { indent: 1, text: '"currency": "EUR",' },
  { indent: 1, text: '"mode": "real"' },
  { indent: 0, text: "}" },
];

export function TechnologySection() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Technology"
              title="One Integration. Endless Possibilities."
              description="Every Octhera product speaks the same technical language, so adding a new provider, market or product doesn't mean starting over."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {technologies.map((tech, i) => (
                <Reveal
                  key={tech.title}
                  delay={i * 60}
                  className="flex items-start gap-3 rounded-xl border border-border bg-elevated/60 p-4"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-bright">
                    <Icon name={tech.icon} className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{tech.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{tech.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div className="card-surface glow-primary rounded-2xl p-1.5">
              <div className="flex items-center gap-1.5 px-4 py-3">
                <span className="size-2.5 rounded-full bg-border-strong" />
                <span className="size-2.5 rounded-full bg-border-strong" />
                <span className="size-2.5 rounded-full bg-primary" />
                <span className="ml-3 font-mono text-xs text-muted">request.json</span>
              </div>
              <div className="rounded-xl bg-background/60 p-5 font-mono text-[13px] leading-relaxed sm:p-6">
                {codeLines.map((line, i) => (
                  <div key={i} style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
                    <span className="text-muted">{line.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
