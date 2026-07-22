import { Hero } from "@/components/hero";
import { ProgramSection } from "@/components/program-section";

export default function Home() {
  return (
    <main className="flex-1 bg-white">
      <Hero />
      <ProgramSection />
    </main>
  );
}
