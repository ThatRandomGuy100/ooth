"use client";

import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";

// Scalloped-seal outline used by the blue badges, precomputed once.
const SEAL_PATH = (() => {
  const N = 28;
  const inner = 46.5;
  const outer = 50;
  let d = "";
  for (let i = 0; i < N; i++) {
    const a0 = (i / N) * 2 * Math.PI;
    const a1 = ((i + 0.5) / N) * 2 * Math.PI;
    const a2 = ((i + 1) / N) * 2 * Math.PI;
    const x0 = 50 + inner * Math.cos(a0);
    const y0 = 50 + inner * Math.sin(a0);
    const xm = 50 + outer * Math.cos(a1);
    const ym = 50 + outer * Math.sin(a1);
    const x2 = 50 + inner * Math.cos(a2);
    const y2 = 50 + inner * Math.sin(a2);
    d += `${i ? "L" : "M"}${x0.toFixed(2)} ${y0.toFixed(2)} Q${xm.toFixed(2)} ${ym.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)} `;
  }
  return d + "Z";
})();

function SealBadge({
  line1,
  line2,
  className = "",
}: {
  line1: string;
  line2: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
        <path d={SEAL_PATH} fill="#2b62c4" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <span className="text-[13px] font-semibold leading-tight">{line1}</span>
        <span className="text-[11px] font-medium leading-tight">{line2}</span>
      </div>
    </div>
  );
}

export function ProgramSection() {
  const { t } = useLanguage();

  return (
    <section
      id="program"
      className="bg-[#f7f8fa] [font-family:var(--font-poppins)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <p className="text-center text-[12px] font-medium uppercase tracking-[0.2em] text-[#6d7681]">
            {t.program.eyebrow}
          </p>
        </Reveal>

        <div className="mt-12 grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
          {/* Photo card with overlapping seal badge */}
          <Reveal delay={100}>
            <div className="relative">
              <img
                src="/program.jpg"
                alt=""
                className="w-full rounded-3xl object-cover shadow-[0_24px_60px_rgba(31,39,51,0.16)]"
              />
              <SealBadge
                line1={t.program.badgeDeliveriesLine1}
                line2={t.program.badgeDeliveriesLine2}
                className="absolute -left-7 -top-7 size-28"
              />
            </div>
          </Reveal>

          {/* Copy column */}
          <div>
            <Reveal delay={200}>
              <div className="relative pr-24 lg:pr-28">
                <h2 className="text-4xl leading-tight text-[#1f2733] sm:text-5xl lg:text-[50px]">
                  {t.program.titleLine1}
                  <span className="block">{t.program.titleLine2}</span>
                </h2>
                <SealBadge
                  line1={t.program.badgeMealsLine1}
                  line2={t.program.badgeMealsLine2}
                  className="absolute -top-2 right-0 size-28"
                />
              </div>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#55606b]">
                {t.program.description}
              </p>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-10 border-t border-slate-200 pt-8">
                <div className="grid max-w-md grid-cols-2 gap-8">
                  <div>
                    <p className="text-4xl text-[#2668c5]">
                      {t.program.stat1Value}
                    </p>
                    <p className="mt-2 text-[15px] text-[#55606b]">
                      {t.program.stat1Label}
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl text-[#2668c5]">
                      {t.program.stat2Value}
                    </p>
                    <p className="mt-2 text-[15px] text-[#55606b]">
                      {t.program.stat2Label}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
