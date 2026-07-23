"use client";

import { ScrollLink } from "@/components/scroll-link";

import { Logo } from "@/components/logo";
import { useLanguage } from "@/components/language-provider";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer
      id="contact"
      className="snap-end border-t border-slate-200 bg-[#fbfcfe] [font-family:var(--font-poppins)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-md">
            <Logo />
            <p className="mt-6 text-[15px] leading-relaxed text-[#55606b]">
              {t.footer.description}
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#1f2733]">
              {t.footer.contact}
            </p>
            <a
              href={`tel:${t.footer.phone.replace(/[^+\d]/g, "")}`}
              className="mt-3 block text-[15px] text-[#55606b] transition-colors hover:text-[#1f2733]"
            >
              {t.footer.phone}
            </a>
            <ScrollLink
              href="#qualify"
              className="mt-1 block text-[15px] text-[#55606b] transition-colors hover:text-[#1f2733]"
            >
              {t.footer.qualify}
            </ScrollLink>
            <ScrollLink
              href="#qualify"
              className="mt-4 inline-flex rounded-lg border border-slate-300 bg-white px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.15em] text-[#1f2733] shadow-sm transition-colors hover:bg-slate-50"
            >
              {t.footer.voucher}
            </ScrollLink>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-[14px] text-[#55606b]">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
