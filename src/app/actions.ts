"use server";

import { prisma } from "@/lib/prisma";

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

  await prisma.application.create({
    data: {
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      dateOfBirth,
      county: input.county,
      medicaidId: input.medicaidId.trim(),
      healthPlan: input.healthPlan.trim(),
      needs: input.needs,
      situation: input.situation.trim(),
      consent: input.consent,
      language: input.language === "es" ? "es" : "en",
    },
  });

  return { ok: true };
}
