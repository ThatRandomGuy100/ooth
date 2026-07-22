"use server";

import { Resend } from "resend";

import { prisma } from "@/lib/prisma";

// All form details are emailed here on every submission, sent from the
// same Resend-verified address.
const APPLICATIONS_EMAIL = "Info@primecapusa.com";

const NEED_LABELS: Record<string, string> = {
  food: "Food & Nutrition Assistance",
  housing: "Housing Support",
  transport: "Transportation",
  employment: "Employment & Education",
  safety: "Personal Safety",
  other: "Other Social Needs",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendApplicationEmail(input: ApplicationInput) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping application email.");
    return;
  }
  const rows: [string, string][] = [
    ["First name", input.firstName],
    ["Last name", input.lastName],
    ["Email address", input.email],
    ["Phone number", input.phone],
    ["Date of birth", input.dateOfBirth],
    ["County", input.county],
    ["Medicaid ID (CIN)", input.medicaidId],
    ["Health plan", input.healthPlan],
    ["Help needed", input.needs.map((n) => NEED_LABELS[n] ?? n).join(", ")],
    ["Situation", input.situation],
    ["Consent given", input.consent ? "Yes" : "No"],
    ["Form language", input.language === "es" ? "Spanish" : "English"],
  ];
  const html = `
    <h2>New qualification application</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="border:1px solid #ddd;font-weight:bold">${label}</td><td style="border:1px solid #ddd">${escapeHtml(value)}</td></tr>`
        )
        .join("")}
    </table>`;

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: `Primemeal <${APPLICATIONS_EMAIL}>`,
    to: APPLICATIONS_EMAIL,
    replyTo: input.email,
    subject: `New application — ${input.firstName} ${input.lastName}`,
    html,
  });
}

export type ApplicationInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  county: string;
  medicaidId: string;
  healthPlan: string;
  needs: string[];
  situation: string;
  consent: boolean;
  language: string;
};

export async function submitApplication(
  input: ApplicationInput
): Promise<{ ok: boolean; error?: string }> {
  const required = [
    input.firstName,
    input.lastName,
    input.email,
    input.phone,
    input.dateOfBirth,
    input.county,
    input.medicaidId,
    input.healthPlan,
    input.situation,
  ];
  if (
    required.some((v) => typeof v !== "string" || !v.trim()) ||
    !Array.isArray(input.needs) ||
    input.needs.length === 0 ||
    input.consent !== true
  ) {
    return { ok: false, error: "invalid" };
  }
  const dateOfBirth = new Date(input.dateOfBirth);
  if (Number.isNaN(dateOfBirth.getTime())) {
    return { ok: false, error: "invalid" };
  }

  const clean: ApplicationInput = {
    ...input,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    medicaidId: input.medicaidId.trim(),
    healthPlan: input.healthPlan.trim(),
    situation: input.situation.trim(),
    language: input.language === "es" ? "es" : "en",
  };

  await prisma.application.create({
    data: {
      firstName: clean.firstName,
      lastName: clean.lastName,
      email: clean.email,
      phone: clean.phone,
      dateOfBirth,
      county: clean.county,
      medicaidId: clean.medicaidId,
      healthPlan: clean.healthPlan,
      needs: clean.needs,
      situation: clean.situation,
      consent: clean.consent,
      language: clean.language,
    },
  });

  // The submission is already saved — don't fail it if the email bounces.
  try {
    await sendApplicationEmail(clean);
  } catch (error) {
    console.error("Failed to send application email:", error);
  }

  return { ok: true };
}
