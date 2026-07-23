"use client";

import { ScrollLink } from "@/components/scroll-link";

import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] snap-start items-center overflow-hidden border-b border-slate-200 bg-white [font-family:var(--font-poppins)]">
      {/* Background photo, anchored right, fading into white on its left and bottom */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] md:block">
        <Reveal y={0} delay={200} className="h-full w-full">
        <img
          src="/hero.jpg"
          alt=""
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-y-0 left-0 w-56 bg-gradient-to-r from-white via-white/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-white via-white/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
        <div className="absolute inset-0 bg-white/10" />
        </Reveal>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl py-16 lg:py-20">
          <Reveal>
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#4778b3]">
              {t.hero.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl leading-tight text-[#1f2733] sm:text-5xl lg:text-[54px]">
              {t.hero.titleLine1}
              <span className="mt-1 block text-[#3d74b8] [font-family:var(--font-playfair)] italic">
                {t.hero.titleLine2}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-[#55606b] lg:text-xl">
              {t.hero.description}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-7 max-w-lg text-[13px] leading-relaxed text-[#6d7681]">
              {t.hero.disclaimer}
            </p>
          </Reveal>

          <Reveal
            delay={400}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <ScrollLink
              href="#qualify"
              className="rounded-md bg-[#16181d] px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-black"
            >
              {t.hero.ctaPrimary}
            </ScrollLink>
            <ScrollLink
              href="#program"
              className="rounded-md border border-slate-200 bg-white px-6 py-3.5 text-[15px] font-medium text-[#1f2733] shadow-sm transition-colors hover:bg-slate-50"
            >
              {t.hero.ctaSecondary}
            </ScrollLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
