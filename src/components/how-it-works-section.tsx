"use client";

import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";

function StepChip({
  n,
  className = "",
}: {
  n: number;
  className?: string;
}) {
  return (
    <span
      className={`flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#dbe7f7] text-[15px] font-semibold text-[#1f2733] transition-colors duration-300 ${className}`}
    >
      {n}
    </span>
  );
}

export function HowItWorksSection() {
  const { t } = useLanguage();

  return (
    <section
      id="how-it-works"
      className="flex min-h-[calc(100vh-4rem)] snap-start bg-[#f7f8fa] [font-family:var(--font-poppins)]"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col justify-center px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-[12px] font-medium uppercase tracking-[0.2em] text-[#6d7681]">
            {t.howItWorks.eyebrow}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-6 text-center text-4xl leading-tight text-[#1f2733] sm:text-5xl">
            {t.howItWorks.titleLine1}
            <span className="block">{t.howItWorks.titleLine2}</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Step 1 — the special card: chip fills and the corner circle grows on hover */}
          <Reveal delay={200} className="h-full">
            <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl">
              <div className="pointer-events-none absolute -bottom-14 -right-8 size-44 rounded-full bg-[#eef3fa] transition-transform duration-500 ease-out group-hover:scale-125" />
              <div className="relative">
                <StepChip
                  n={1}
                  className="group-hover:bg-[#2360b7] group-hover:text-white"
                />
                <h3 className="mt-7 text-2xl font-semibold text-[#1f2733]">
                  {t.howItWorks.step1Title}
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#55606b]">
                  {t.howItWorks.step1Body}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Steps 2 & 3 — whole card floods blue on hover */}
          <div className="flex h-full flex-col gap-6">
            {(
              [
                { n: 2, title: t.howItWorks.step2Title, body: t.howItWorks.step2Body },
                { n: 3, title: t.howItWorks.step3Title, body: t.howItWorks.step3Body },
              ] as const
            ).map((step) => (
              <Reveal key={step.n} delay={step.n * 100 + 100} className="flex-1">
                <div className="group flex h-full gap-5 rounded-2xl border border-slate-200/70 bg-white p-8 shadow-sm transition-all duration-300 hover:border-transparent hover:bg-[#2360b7] hover:shadow-xl">
                  <StepChip n={step.n} />
                  <div>
                    <h3 className="text-lg font-semibold text-[#1f2733] transition-colors duration-300 group-hover:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#55606b] transition-colors duration-300 group-hover:text-white/90">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
