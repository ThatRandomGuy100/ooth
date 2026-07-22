"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/logo";
import { useLanguage } from "@/components/language-provider";
import { LANGUAGES } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "program", href: "#program" },
  { key: "whoQualifies", href: "#who-qualifies" },
  { key: "howItWorks", href: "#how-it-works" },
  { key: "contact", href: "#contact" },
] as const;

function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center rounded-lg border border-zinc-200 bg-white p-0.5">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-bold transition-colors",
            lang === code
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:text-slate-900"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Primemeal — home">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 lg:flex">
          {NAV_ITEMS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="text-base text-slate-800 transition-colors hover:text-slate-950"
            >
              {t.nav[key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <Link
            href="#qualify"
            className="hidden rounded-xl bg-slate-900 px-5 py-2 text-[15px] font-bold text-white transition-colors hover:bg-slate-800 sm:inline-flex"
          >
            {t.header.cta}
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            className="inline-flex size-9 items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-100 lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-zinc-100 bg-white px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
                >
                  {t.nav[key]}
                </Link>
              </li>
            ))}
            <li className="mt-2 sm:hidden">
              <Link
                href="#qualify"
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl bg-slate-900 px-5 py-2 text-center text-[15px] font-bold text-white"
              >
                {t.header.cta}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
