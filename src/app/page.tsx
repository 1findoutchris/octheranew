import { Hero } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProductsOverview } from "@/components/sections/ProductsOverview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { WhyOcthera } from "@/components/sections/WhyOcthera";
import { CTASection } from "@/components/sections/CTASection";

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
