// Auto-translates src/lib/i18n.en.json into i18n.<lang>.json files.
// English is the only dictionary you edit — run `npm run translate`
// after adding/changing strings and the rest are regenerated.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const TARGET_LANGS = ["es"];

// Key paths copied verbatim into every language (symbols, abbreviations, stats).
const KEEP_VERBATIM = new Set(["program.stat1Value", "program.stat2Value"]);

const dir = path.join(process.cwd(), "src", "lib");
const en = JSON.parse(readFileSync(path.join(dir, "i18n.en.json"), "utf8"));

/** Flatten a nested dictionary into [pathSegments, text] pairs. */
function flatten(obj, prefix = []) {
  return Object.entries(obj).flatMap(([key, value]) =>
    typeof value === "string"
      ? [[[...prefix, key], value]]
      : flatten(value, [...prefix, key])
  );
}

function setDeep(obj, segments, value) {
  const last = segments.at(-1);
  let node = obj;
  for (const key of segments.slice(0, -1)) node = node[key] ??= {};
  node[last] = value;
}

async function translate(text, to) {
  const url =
    "https://translate.googleapis.com/translate_a/single" +
    `?client=gtx&sl=en&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Translate failed (${res.status}) for "${text}"`);
  const data = await res.json();
  const translated = data[0].map((segment) => segment[0]).join("");
  // Mirror the source's leading capitalization (the API sometimes lowercases).
  return /^[A-Z]/.test(text)
    ? translated.charAt(0).toUpperCase() + translated.slice(1)
    : translated;
}

const entries = flatten(en);

for (const lang of TARGET_LANGS) {
  const out = {};
  for (const [segments, text] of entries) {
    const translated = KEEP_VERBATIM.has(segments.join("."))
      ? text
      : await translate(text, lang);
    setDeep(out, segments, translated);
    console.log(`[${lang}] ${segments.join(".")}: "${text}" -> "${translated}"`);
  }
  writeFileSync(
    path.join(dir, `i18n.${lang}.json`),
    JSON.stringify(out, null, 2) + "\n"
  );
}

console.log(`\nDone. Translated ${entries.length} strings into: ${TARGET_LANGS.join(", ")}`);
