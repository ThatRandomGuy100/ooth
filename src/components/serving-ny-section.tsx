"use client";

import { motion } from "motion/react";

import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";
import { ScrollLink } from "@/components/scroll-link";

export function ServingNySection() {
  const { t } = useLanguage();

  // Style the "$0" inside the (translated) headline.
  const [zeroPre, zeroPost] = t.servingNy.titleLine2.split("$0");

  return (
    <section className="group relative flex min-h-[calc(100vh-4rem)] snap-start items-center overflow-hidden [font-family:var(--font-poppins)]">
      {/* Background street photo — zooms slowly on hover */}
      <div className="absolute inset-0">
        <img
          src="/serving-ny.jpg"
          alt=""
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#0e1322]/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,14,25,0.55),transparent_72%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-white/80">
            {t.servingNy.eyebrow}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-8 text-4xl leading-tight text-white sm:text-5xl lg:text-[54px]">
            {t.servingNy.titleLine1}
            <span className="block">
              {zeroPost === undefined ? (
                t.servingNy.titleLine2
              ) : (
                <>
                  {zeroPre}
                  <span className="text-[#6d9fe0] [font-family:var(--font-playfair)] italic">
                    $0
                  </span>
                  {zeroPost}
                </>
              )}
            </span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-8 text-lg text-[#8fb4e8]">{t.servingNy.subtitle}</p>
        </Reveal>

        <Reveal delay={300}>
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mt-10 inline-block"
          >
            <ScrollLink
              href="#qualify"
              className="inline-block rounded-lg bg-white px-7 py-3.5 text-[15px] font-medium text-[#1f2733] shadow-lg transition-colors hover:bg-slate-100"
            >
              {t.servingNy.cta}
            </ScrollLink>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
