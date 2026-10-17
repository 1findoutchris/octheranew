import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProductsOverview } from "@/components/sections/ProductsOverview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { WhyOcthera } from "@/components/sections/WhyOcthera";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: { absolute: "Octhera | B2B iGaming Platform, Casino Aggregator & Sportsbook" },
  description:
    "B2B iGaming technology for licensed operators: casino game aggregation through one API, a sportsbook, and white label and turnkey platforms, with published pricing.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Octhera",
    url: "/",
    title: "Octhera | B2B iGaming Platform, Casino Aggregator & Sportsbook",
    description:
      "B2B iGaming technology for licensed operators: casino game aggregation, sportsbook, white label and turnkey platforms.",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ProductsOverview />
      <HowItWorks />
      <TechnologySection />
      <WhyOcthera />
      <CTASection />
    </>
  );
}
