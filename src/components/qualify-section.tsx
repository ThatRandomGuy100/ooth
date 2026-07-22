"use client";

import { useState } from "react";
import { ArrowRight, CircleCheck, Clock } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { QualifyModal } from "@/components/qualify-modal";
import { Reveal } from "@/components/reveal";

export function QualifySection() {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="qualify"
      className="flex min-h-[calc(100vh-4rem)] snap-start bg-gradient-to-b from-[#e7edf9] via-[#edf2fb] to-[#f6f8fd] [font-family:var(--font-poppins)]"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-24 lg:px-8">
        {/* Left column — heading + what happens next */}
        <div>
          <Reveal>
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#4a5461]">
              {t.qualify.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-6 text-4xl leading-tight text-[#1f2733] sm:text-5xl lg:text-[50px]">
              {t.qualify.titleLine1}
              <span className="mt-1 block text-[#3d74b8] [font-family:var(--font-playfair)] italic">
                {t.qualify.titleLine2}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#3f4956]">
              {t.qualify.description}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 rounded-2xl bg-white p-8 shadow-[0_16px_40px_rgba(31,39,51,0.08)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(31,39,51,0.14)]">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#4a5461]">
                {t.qualify.stepsTitle}
              </p>
              <ul className="mt-6 space-y-5">
                {([t.qualify.step1, t.qualify.step2, t.qualify.step3] as const).map(
                  (step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#dbe7f7] text-[13px] font-semibold text-[#2668c5]">
                        {i + 1}
                      </span>
                      <p className="text-[15px] leading-relaxed text-[#3f4956]">
                        {step}
                      </p>
                    </li>
                  )
                )}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Right column — application card */}
        <Reveal delay={250}>
          <div className="rounded-2xl bg-white p-8 shadow-[0_24px_60px_rgba(31,39,51,0.10)] transition-shadow duration-300 hover:shadow-[0_28px_70px_rgba(31,39,51,0.16)] sm:p-10">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#e3edf8]">
              <CircleCheck className="size-6 text-[#2668c5]" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-[#1f2733]">
              {t.qualify.cardTitle}
            </h3>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#55606b]">
              {t.qualify.cardBody}
            </p>

            <p className="mt-6 flex items-center gap-2 text-[15px] text-[#1f2733]">
              <Clock className="size-4 text-[#2668c5]" />
              <span>
                {t.qualify.timeNote}{" "}
                <strong className="font-semibold">{t.qualify.timeStrong}</strong>
              </span>
            </p>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#16181d] px-6 py-4 text-[15px] font-medium text-white transition-colors hover:bg-black"
            >
              {t.qualify.cta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <p className="mt-4 text-[13px] leading-relaxed text-[#6d7681]">
              {t.qualify.privacy}
            </p>
          </div>
        </Reveal>
      </div>

      <QualifyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
