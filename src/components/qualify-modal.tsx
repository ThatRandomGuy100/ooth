"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { submitApplication } from "@/app/actions";

const NY_COUNTIES = [
  "Albany", "Allegany", "Bronx", "Broome", "Cattaraugus", "Cayuga",
  "Chautauqua", "Chemung", "Chenango", "Clinton", "Columbia", "Cortland",
  "Delaware", "Dutchess", "Erie", "Essex", "Franklin", "Fulton", "Genesee",
  "Greene", "Hamilton", "Herkimer", "Jefferson", "Kings (Brooklyn)", "Lewis",
  "Livingston", "Madison", "Monroe", "Montgomery", "Nassau",
  "New York (Manhattan)", "Niagara", "Oneida", "Onondaga", "Ontario",
  "Orange", "Orleans", "Oswego", "Otsego", "Putnam", "Queens", "Rensselaer",
  "Richmond (Staten Island)", "Rockland", "Saratoga", "Schenectady",
  "Schoharie", "Schuyler", "Seneca", "St. Lawrence", "Steuben", "Suffolk",
  "Sullivan", "Tioga", "Tompkins", "Ulster", "Warren", "Washington", "Wayne",
  "Westchester", "Wyoming", "Yates",
];

const NEEDS = [
  "food",
  "housing",
  "transport",
  "employment",
  "safety",
  "other",
] as const;

const NEED_LABEL_KEYS = {
  food: "needFood",
  housing: "needHousing",
  transport: "needTransport",
  employment: "needEmployment",
  safety: "needSafety",
  other: "needOther",
} as const;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#2668c5]">
      {children}
    </p>
  );
}

function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1f2733]"
    >
      {children}
      <span className="text-[#2668c5]">•</span>
    </label>
  );
}

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-[15px] text-[#1f2733] outline-none transition-colors placeholder:text-[#9aa4b0] focus:border-[#2668c5] focus:bg-white focus:ring-2 focus:ring-[#2668c5]/20";

export function QualifyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, lang } = useLanguage();
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [needsError, setNeedsError] = useState(false);

  // Close on Escape; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Reset for the next visit after the modal closes.
  useEffect(() => {
    if (!open && status !== "idle") setStatus("idle");
  }, [open, status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Every field is compulsory — the needs checkboxes can't be enforced
    // with a plain `required` attribute, so check them here.
    if (data.getAll("needs").length === 0) {
      setNeedsError(true);
      return;
    }
    setNeedsError(false);
    setStatus("submitting");
    const result = await submitApplication({
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      dateOfBirth: String(data.get("dateOfBirth") ?? ""),
      county: String(data.get("county") ?? ""),
      referredBy: String(data.get("referredBy") ?? ""),
      medicaidId: String(data.get("medicaidId") ?? ""),
      healthPlan: String(data.get("healthPlan") ?? ""),
      needs: data.getAll("needs").map(String),
      situation: String(data.get("situation") ?? ""),
      consent: data.get("consent") === "on",
      language: lang,
    });
    setStatus(result.ok ? "success" : "error");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 [font-family:var(--font-poppins)]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t.form.close}
              className="absolute right-5 top-5 rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <X className="size-5" />
            </button>

            {status === "success" ? (
              <div className="py-16 text-center">
                <h2 className="text-3xl text-[#1f2733]">
                  {t.form.successTitle}
                </h2>
                <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#55606b]">
                  {t.form.successBody}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-8 rounded-lg bg-[#16181d] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-black"
                >
                  {t.form.close}
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl text-[#1f2733]">{t.form.title}</h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#55606b]">
                  {t.form.intro}
                </p>

                <form onSubmit={handleSubmit} className="mt-8">
                  {/* Personal information */}
                  <SectionHeading>{t.form.sectionPersonal}</SectionHeading>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <FieldLabel htmlFor="q-first">{t.form.firstName}</FieldLabel>
                      <input id="q-first" name="firstName" required className={inputClass} />
                    </div>
                    <div>
                      <FieldLabel htmlFor="q-last">{t.form.lastName}</FieldLabel>
                      <input id="q-last" name="lastName" required className={inputClass} />
                    </div>
                    <div>
                      <FieldLabel htmlFor="q-email">{t.form.email}</FieldLabel>
                      <input id="q-email" name="email" type="email" required className={inputClass} />
                    </div>
                    <div>
                      <FieldLabel htmlFor="q-phone">{t.form.phone}</FieldLabel>
                      <input id="q-phone" name="phone" type="tel" required className={inputClass} />
                    </div>
                    <div>
                      <FieldLabel htmlFor="q-dob">{t.form.dob}</FieldLabel>
                      <input id="q-dob" name="dateOfBirth" type="date" required className={inputClass} />
                    </div>
                    <div>
                      <FieldLabel htmlFor="q-county">{t.form.county}</FieldLabel>
                      <select
                        id="q-county"
                        name="county"
                        required
                        defaultValue=""
                        className={inputClass}
                      >
                        <option value="" disabled>
                          {t.form.countyPlaceholder}
                        </option>
                        {NY_COUNTIES.map((county) => (
                          <option key={county} value={county}>
                            {county}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <FieldLabel htmlFor="q-referred">{t.form.referredBy}</FieldLabel>
                      <input
                        id="q-referred"
                        name="referredBy"
                        required
                        placeholder={t.form.referredByPlaceholder}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Medicaid information */}
                  <div className="mt-8 border-t border-slate-200 pt-8">
                    <SectionHeading>{t.form.sectionMedicaid}</SectionHeading>
                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <div>
                        <FieldLabel htmlFor="q-medicaid">{t.form.medicaidId}</FieldLabel>
                        <input
                          id="q-medicaid"
                          name="medicaidId"
                          required
                          placeholder={t.form.medicaidPlaceholder}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <FieldLabel htmlFor="q-plan">{t.form.healthPlan}</FieldLabel>
                        <input
                          id="q-plan"
                          name="healthPlan"
                          required
                          placeholder={t.form.healthPlanPlaceholder}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Needs */}
                  <div className="mt-8 border-t border-slate-200 pt-8">
                    <SectionHeading>
                      {t.form.sectionNeeds}{" "}
                      <span className="text-[#2668c5]">•</span>
                    </SectionHeading>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      {NEEDS.map((need) => (
                        <label
                          key={need}
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3.5 text-[15px] text-[#1f2733] transition-colors has-[:checked]:border-[#2668c5] has-[:checked]:bg-[#eaf1fb] hover:border-slate-300"
                        >
                          <input
                            type="checkbox"
                            name="needs"
                            value={need}
                            onChange={() => setNeedsError(false)}
                            className="size-4 accent-[#2668c5]"
                          />
                          {t.form[NEED_LABEL_KEYS[need]]}
                        </label>
                      ))}
                    </div>
                    {needsError && (
                      <p className="mt-3 text-[14px] text-red-600">
                        {t.form.needsRequired}
                      </p>
                    )}
                  </div>

                  {/* Additional information */}
                  <div className="mt-8 border-t border-slate-200 pt-8">
                    <SectionHeading>{t.form.sectionAdditional}</SectionHeading>
                    <div className="mt-5">
                      <FieldLabel htmlFor="q-situation">{t.form.situation}</FieldLabel>
                      <textarea
                        id="q-situation"
                        name="situation"
                        required
                        rows={4}
                        placeholder={t.form.situationPlaceholder}
                        className={`${inputClass} resize-y`}
                      />
                    </div>
                  </div>

                  {/* Consent */}
                  <label className="mt-8 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-[#f7f9fc] p-5 text-[15px] leading-relaxed text-[#3f4956]">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-1 size-4 shrink-0 accent-[#2668c5]"
                    />
                    {t.form.consent}
                  </label>

                  {status === "error" && (
                    <p className="mt-4 text-[14px] text-red-600">
                      {t.form.error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#16181d] px-6 py-4 text-[15px] font-medium text-white transition-colors hover:bg-black disabled:opacity-60"
                  >
                    {status === "submitting" ? t.form.submitting : t.form.submit}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <p className="mt-4 text-center text-[13px] text-[#6d7681]">
                    {t.qualify.privacy}
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
