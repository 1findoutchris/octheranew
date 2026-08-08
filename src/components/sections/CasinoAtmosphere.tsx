/**
 * Premium, code-drawn casino/iGaming atmosphere for the hero background.
 * Pure SVG + CSS (no image/video asset) so it stays crisp at any size,
 * costs no extra network weight, and re-themes automatically from the
 * existing color tokens in globals.css. All motion is disabled globally
 * under prefers-reduced-motion (see globals.css).
 */
export function CasinoAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base vignette + warm glows */}
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="animate-pulse-glow absolute -top-16 left-[18%] size-[26rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="animate-float absolute right-[8%] top-24 hidden size-72 rounded-full bg-primary/10 blur-3xl lg:block" />
      <div
        className="absolute -bottom-24 -left-24 hidden size-[24rem] rounded-full blur-3xl lg:block"
        style={{ background: "var(--color-luxury-ember)" }}
      />

      {/* Roulette wheel — bleeds off the bottom-right corner */}
      <svg
        className="animate-spin-slow absolute -bottom-52 -right-52 hidden size-[38rem] opacity-[0.16] xl:block"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="188" stroke="var(--color-luxury-line)" strokeWidth="1" />
        <circle cx="200" cy="200" r="158" stroke="var(--color-primary-bright)" strokeWidth="1" />
        <circle cx="200" cy="200" r="6" fill="var(--color-amber)" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="200"
            y1="42"
            x2="200"
            y2="12"
            stroke="var(--color-luxury-line)"
            strokeWidth="1"
            transform={`rotate(${(i * 360) / 24} 200 200)`}
          />
        ))}
      </svg>

      {/* Playing cards — bleed off the top-left corner */}
      <svg
        className="absolute -left-20 top-16 hidden size-64 opacity-[0.10] lg:block"
        viewBox="0 0 200 280"
        fill="none"
      >
        <g transform="rotate(-14 100 140)">
          <rect x="20" y="20" width="160" height="240" rx="18" stroke="white" strokeWidth="1.5" />
          <path d="M50 50 L60 68 L50 86 L40 68 Z" fill="var(--color-primary-bright)" />
        </g>
      </svg>
      <svg
        className="absolute left-6 top-40 hidden size-56 opacity-[0.08] lg:block"
        viewBox="0 0 200 280"
        fill="none"
      >
        <g transform="rotate(10 100 140)">
          <rect x="20" y="20" width="160" height="240" rx="18" stroke="white" strokeWidth="1.5" />
          <circle cx="50" cy="68" r="13" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Poker chip stack — lower left */}
      <svg
        className="absolute bottom-16 left-[14%] hidden size-20 opacity-[0.16] lg:block"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="58" r="34" stroke="var(--color-primary-bright)" strokeWidth="2" strokeDasharray="5 6" />
        <circle cx="50" cy="58" r="22" stroke="var(--color-amber)" strokeWidth="1.5" />
        <circle cx="50" cy="34" r="34" stroke="var(--color-luxury-line)" strokeWidth="2" strokeDasharray="5 6" />
        <circle cx="50" cy="34" r="22" stroke="var(--color-primary-bright)" strokeWidth="1.5" />
      </svg>

      {/* Slot reel columns — small, lower left, beside the chips */}
      <svg
        className="absolute bottom-12 left-[6%] hidden size-24 opacity-[0.14] lg:block"
        viewBox="0 0 120 90"
        fill="none"
      >
        <rect x="4" y="4" width="34" height="82" rx="8" stroke="var(--color-amber)" strokeWidth="1.5" />
        <rect x="43" y="4" width="34" height="82" rx="8" stroke="var(--color-primary-bright)" strokeWidth="1.5" />
        <rect x="82" y="4" width="34" height="82" rx="8" stroke="var(--color-luxury-line)" strokeWidth="1.5" />
        <path d="M4 32h34M4 58h34M43 32h34M43 58h34M82 32h34M82 58h34" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
      </svg>

      {/* Tech grid ties the motif back to "modern technology" */}
      <div className="absolute inset-0 bg-grid opacity-[0.22] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />

      {/* Readability scrim behind the text column */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 75% at 22% 50%, var(--color-bg) 0%, transparent 72%)",
        }}
      />
    </div>
  );
}
