import { Hero } from "@/components/hero";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { ProgramSection } from "@/components/program-section";
import { QualifySection } from "@/components/qualify-section";
import { SiteFooter } from "@/components/site-footer";
import { WhatYouGetSection } from "@/components/what-you-get-section";
import { WhoQualifiesSection } from "@/components/who-qualifies-section";

export default function Home() {
  return (
    <main className="flex-1 bg-white">
      <Hero />
      <ProgramSection />
      <WhoQualifiesSection />
      <HowItWorksSection />
      <WhatYouGetSection />
      <QualifySection />
      <SiteFooter />
    </main>
  );
}
