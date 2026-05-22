import { z } from "zod";

export const reisearten = [
  "Rundreise",
  "Strand & Erholung",
  "Städtetrip",
  "Aktiv & Wandern",
  "Kulturreise",
  "Safari",
  "Kreuzfahrt",
  "Wellness",
  "Skifahren",
] as const;

export const regionen = [
  "Europa",
  "Asien",
  "Afrika",
  "Amerika",
  "Ozeanien",
] as const;

export const praeferenzen = [
  "Familienfreundlich",
  "Nachhaltigkeit",
  "Lokale Erfahrungen",
  "Privatreise",
  "Gruppenreise",
  "All-Inclusive",
  "Ausflüge inklusive",
  "Direktflug",
] as const;

export const komfortLevels = ["komfort", "premium", "luxus"] as const;
export const kontaktwege = ["email", "telefon", "termin"] as const;
export const kontaktzeiten = ["vormittag", "nachmittag", "abend", "egal"] as const;

// Step 1: Reisende und Zeitraum
export const stepReisendeSchema = z.object({
  erwachsene: z.number().min(1, "Mindestens 1 Erwachsener").max(10),
  kinder: z.number().min(0).max(10),
  kinderAlter: z.array(z.number().min(0).max(17)).optional(),
  reisedatumVon: z.string().min(1, "Bitte wählen Sie ein Startdatum"),
  reisedatumBis: z.string().min(1, "Bitte wählen Sie ein Enddatum"),
  flexibel: z.boolean(),
  dauerTage: z.number().min(1).max(30),
});

// Step 2: Destination
export const stepDestinationSchema = z.object({
  destination: z.string().optional(),
  ueberraschen: z.boolean(),
  regionen: z.array(z.enum(regionen)).optional(),
  reiseart: z.array(z.enum(reisearten)).min(1, "Bitte wählen Sie mindestens eine Reiseart"),
});

// Step 3: Stil und Budget
export const stepStilSchema = z.object({
  komfortLevel: z.enum(komfortLevels, {
    message: "Bitte wählen Sie ein Komfort-Level",
  }),
  budgetProPerson: z.number().optional(),
  wichtig: z.array(z.enum(praeferenzen)),
});

// Step 4: Kontakt
export const stepKontaktSchema = z.object({
  vorname: z.string().min(1, "Bitte geben Sie Ihren Vornamen ein"),
  nachname: z.string().min(1, "Bitte geben Sie Ihren Nachnamen ein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  telefon: z.string().optional(),
  kontaktweg: z.enum(kontaktwege, {
    message: "Bitte wählen Sie einen Kontaktweg",
  }),
  kontaktzeit: z.enum(kontaktzeiten).optional(),
  nachricht: z.string().max(500).optional(),
  datenschutz: z.literal(true, {
    message: "Bitte akzeptieren Sie die Datenschutzerklärung",
  }),
});

// Gesamtschema
export const anfrageSchema = z.object({
  reisende: stepReisendeSchema,
  destination: stepDestinationSchema,
  stil: stepStilSchema,
  kontakt: stepKontaktSchema,
});

export type AnfrageFormData = z.infer<typeof anfrageSchema>;
export type StepReisende = z.infer<typeof stepReisendeSchema>;
export type StepDestination = z.infer<typeof stepDestinationSchema>;
export type StepStil = z.infer<typeof stepStilSchema>;
export type StepKontakt = z.infer<typeof stepKontaktSchema>;
