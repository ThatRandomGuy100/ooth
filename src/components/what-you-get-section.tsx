"use client";

import { CalendarDays, Heart, House, ShieldCheck } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";

const CARDS = [
  { key: "card1", icon: House },
  { key: "card2", icon: ShieldCheck },
  { key: "card3", icon: CalendarDays },
  { key: "card4", icon: Heart },
] as const;

export function WhatYouGetSection() {
  const { t } = useLanguage();

  return (
    <section className="flex min-h-[calc(100vh-4rem)] snap-start bg-white [font-family:var(--font-poppins)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-[12px] font-medium uppercase tracking-[0.2em] text-[#6d7681]">
            {t.whatYouGet.eyebrow}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mx-auto mt-6 max-w-3xl text-center text-4xl leading-tight text-[#1f2733] sm:text-5xl">
            {t.whatYouGet.titleLine1}
            <span className="block">{t.whatYouGet.titleLine2}</span>
          </h2>
        </Reveal>

        <div className="mt-12">
          {/* Photo — zooms gently on hover */}
          <Reveal delay={200}>
            <div className="group overflow-hidden rounded-3xl">
              <img
                src="/what-you-get.jpg"
                alt=""
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>

          {/* Cards overlapping the photo's bottom edge */}
          <div className="relative z-10 -mt-10 grid gap-6 px-4 sm:grid-cols-2 sm:px-8 lg:-mt-24 lg:grid-cols-4 lg:px-14">
            {CARDS.map((card, i) => (
              <Reveal key={card.key} delay={250 + i * 80} className="h-full">
                <div className="group h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_16px_40px_rgba(31,39,51,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_55px_rgba(31,39,51,0.16)]">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-[#e3edf8] transition-colors duration-300 group-hover:bg-[#2360b7]">
                    <card.icon className="size-5 text-[#2668c5] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="mt-5 text-[17px] font-semibold leading-snug text-[#1f2733]">
                    {t.whatYouGet[`${card.key}Title`]}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#55606b]">
                    {t.whatYouGet[`${card.key}Body`]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
