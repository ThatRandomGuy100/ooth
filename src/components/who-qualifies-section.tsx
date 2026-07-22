"use client";

import {
  Baby,
  Brain,
  Building2,
  Heart,
  Hospital,
  House,
  Stethoscope,
} from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";

const CARDS = [
  { key: "card1", icon: Brain },
  { key: "card2", icon: Heart },
  { key: "card3", icon: Baby },
  { key: "card4", icon: Building2 },
  { key: "card5", icon: Stethoscope },
  { key: "card6", icon: Hospital },
  { key: "card7", icon: House, wide: true },
] as const;

export function WhoQualifiesSection() {
  const { t } = useLanguage();

  return (
    <section
      id="who-qualifies"
      className="flex min-h-[calc(100vh-4rem)] snap-start bg-white [font-family:var(--font-poppins)]"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-[12px] font-medium uppercase tracking-[0.2em] text-[#6d7681]">
            {t.whoQualifies.eyebrow}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mx-auto mt-6 max-w-3xl text-center text-4xl leading-tight text-[#1f2733] sm:text-5xl">
            {t.whoQualifies.title}
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-[#55606b]">
            {t.whoQualifies.description}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <Reveal
              key={card.key}
              delay={250 + i * 80}
              className={
                "wide" in card && card.wide ? "h-full sm:col-span-2" : "h-full"
              }
            >
              <div className="group flex h-full flex-col items-center rounded-2xl border border-slate-200/70 bg-white px-8 py-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#e3edf8] transition-colors duration-300 group-hover:bg-[#2360b7]">
                  <card.icon className="size-7 text-[#2668c5] transition-colors duration-300 group-hover:text-white" />
                </div>
                <p className="mt-6 text-[17px] leading-snug text-[#1f2733]">
                  {t.whoQualifies.cards[card.key]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
