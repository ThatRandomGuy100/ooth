import en from "./i18n.en.json";
import esJson from "./i18n.es.json";

// English (i18n.en.json) is the single source of truth.
// Other languages are generated — never edit them by hand, run `npm run translate`.
export type Dictionary = typeof en;

/** Overlay a generated dictionary on English so missing keys fall back instead of crashing. */
function withFallback<T>(base: T, override: unknown): T {
  if (typeof base === "string") {
    return (typeof override === "string" ? override : base) as T;
  }
  const out = {} as T;
  for (const key in base) {
    out[key] = withFallback(
      base[key],
      (override as Record<string, unknown> | undefined)?.[key]
    );
  }
  return out;
}

const es: Dictionary = withFallback(en, esJson);

export const translations = { en, es };

export type Language = keyof typeof translations;

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];
