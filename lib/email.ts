import nodemailer from "nodemailer";
import { Resend } from "resend";
import type { AnfrageFormData } from "@/lib/schemas";

type AnfrageMitId = AnfrageFormData & {
  id: string;
  metadaten: {
    eingegangenAm: string;
  };
};

const AGENCY_EMAIL = "info@swisstravel-solutions.ch";
const AGENCY_NAME = "SwissTravel Solutions";

// Resend-Client (nur wenn API-Key vorhanden)
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/**
 * Ethereal-Fallback: erstellt einen Test-Transporter.
 * Mails werden nicht zugestellt, aber über Preview-URL anschaubar.
 */
async function createEtherealTransporter() {
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

function buildCustomerEmailHtml(anfrage: AnfrageMitId): string {
  const { reisende, destination, stil, kontakt } = anfrage;

  const budgetText = stil.budgetProPerson
    ? stil.budgetProPerson >= 30000
      ? "über CHF 30\u2019000"
      : `CHF ${stil.budgetProPerson.toLocaleString("de-CH")}`
    : "Noch offen";

  const komfortLabels: Record<string, string> = {
    komfort: "Komfort",
    premium: "Premium",
    luxus: "Luxus",
  };

  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"></head>
<body style="font-family: Georgia, 'Times New Roman', serif; color: #1A1A1A; background: #F7F4EE; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 24px;">
    <div style="border-bottom: 1px solid #E8E2D8; padding-bottom: 24px; margin-bottom: 32px;">
      <h1 style="font-size: 24px; font-weight: 400; margin: 0;">SwissTravel Solutions</h1>
      <p style="color: #6B6B6B; font-size: 14px; margin: 8px 0 0; font-family: -apple-system, Arial, sans-serif;">Ihre Reiseanfrage</p>
    </div>

    <p style="font-size: 16px; line-height: 1.6;">
      Guten Tag ${kontakt.vorname} ${kontakt.nachname},
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #6B6B6B;">
      Vielen Dank für Ihre Anfrage. Wir haben Ihre Reisewünsche erhalten und
      werden uns innerhalb von 24 Stunden persönlich bei Ihnen melden –
      häufig auch schneller.
    </p>

    <h2 style="font-size: 18px; font-weight: 400; margin-top: 32px; border-bottom: 1px solid #E8E2D8; padding-bottom: 8px;">
      Zusammenfassung Ihrer Anfrage
    </h2>

    <table style="width: 100%; font-size: 14px; font-family: -apple-system, Arial, sans-serif; border-collapse: collapse; margin-top: 16px;">
      <tr><td colspan="2" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #6B6B6B; padding: 16px 0 6px;">Reisende und Zeitraum</td></tr>
      <tr>
        <td style="padding: 4px 0; color: #6B6B6B;">Erwachsene</td>
        <td style="padding: 4px 0; text-align: right;">${reisende.erwachsene}</td>
      </tr>
      ${reisende.kinder > 0 ? `<tr><td style="padding: 4px 0; color: #6B6B6B;">Kinder</td><td style="padding: 4px 0; text-align: right;">${reisende.kinder} (Alter: ${reisende.kinderAlter?.join(", ") || "–"})</td></tr>` : ""}
      <tr>
        <td style="padding: 4px 0; color: #6B6B6B;">Reisezeitraum</td>
        <td style="padding: 4px 0; text-align: right;">${reisende.reisedatumVon} – ${reisende.reisedatumBis}${reisende.flexibel ? " (± 1 Woche flexibel)" : ""}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; color: #6B6B6B;">Reisedauer</td>
        <td style="padding: 4px 0; text-align: right;">${reisende.dauerTage} Tage</td>
      </tr>

      <tr><td colspan="2" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #6B6B6B; padding: 16px 0 6px; border-top: 1px solid #E8E2D8;">Destination</td></tr>
      <tr>
        <td style="padding: 4px 0; color: #6B6B6B;">Wunschziel</td>
        <td style="padding: 4px 0; text-align: right;">${destination.ueberraschen ? "Überraschen Sie mich" : destination.destination || "–"}</td>
      </tr>
      ${destination.regionen && destination.regionen.length > 0 ? `<tr><td style="padding: 4px 0; color: #6B6B6B;">Regionen</td><td style="padding: 4px 0; text-align: right;">${destination.regionen.join(", ")}</td></tr>` : ""}
      <tr>
        <td style="padding: 4px 0; color: #6B6B6B;">Reiseart</td>
        <td style="padding: 4px 0; text-align: right;">${destination.reiseart.join(", ")}</td>
      </tr>

      <tr><td colspan="2" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #6B6B6B; padding: 16px 0 6px; border-top: 1px solid #E8E2D8;">Stil und Budget</td></tr>
      <tr>
        <td style="padding: 4px 0; color: #6B6B6B;">Komfort-Level</td>
        <td style="padding: 4px 0; text-align: right;">${komfortLabels[stil.komfortLevel] || stil.komfortLevel}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; color: #6B6B6B;">Budget pro Person</td>
        <td style="padding: 4px 0; text-align: right;">${budgetText}</td>
      </tr>
      ${stil.wichtig.length > 0 ? `<tr><td style="padding: 4px 0; color: #6B6B6B;">Wichtig</td><td style="padding: 4px 0; text-align: right;">${stil.wichtig.join(", ")}</td></tr>` : ""}
    </table>

    <div style="margin-top: 32px; padding: 20px; background: #2C4A52; text-align: center;">
      <p style="color: #F7F4EE; font-size: 14px; margin: 0; font-family: -apple-system, Arial, sans-serif;">
        Haben Sie Fragen? Rufen Sie uns an:
      </p>
      <p style="color: #F7F4EE; font-size: 18px; margin: 8px 0 0;">
        +41 62 891 00 00
      </p>
    </div>

    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #E8E2D8; font-size: 13px; color: #6B6B6B; font-family: -apple-system, Arial, sans-serif;">
      <p style="margin: 0;">Herzliche Grüsse,<br>Ihr SwissTravel Solutions Team</p>
      <p style="margin-top: 16px; font-size: 12px;">
        SwissTravel Solutions AG · Bahnhofstrasse 12 · 5600 Lenzburg<br>
        info@swisstravel-solutions.ch · +41 62 891 00 00
      </p>
    </div>
  </div>
</body>
</html>`;
}

function buildAgencyEmailHtml(anfrage: AnfrageMitId): string {
  const { reisende, destination, stil, kontakt, id, metadaten } = anfrage;

  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, Arial, sans-serif; color: #1A1A1A; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 24px;">
    <h1 style="font-size: 20px; font-weight: 500; margin: 0;">Neue Reiseanfrage eingegangen</h1>
    <p style="color: #6B6B6B; font-size: 13px; margin: 4px 0 0;">
      ID: ${id} · ${new Date(metadaten.eingegangenAm).toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
    </p>

    <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-left: 3px solid #2C4A52;">
      <h2 style="font-size: 14px; font-weight: 500; margin: 0 0 8px;">Kontaktdaten</h2>
      <p style="margin: 0; font-size: 14px;">
        <strong>${kontakt.vorname} ${kontakt.nachname}</strong><br>
        ${kontakt.email}${kontakt.telefon ? `<br>${kontakt.telefon}` : ""}<br>
        Kontaktweg: ${kontakt.kontaktweg}${kontakt.kontaktzeit ? ` (${kontakt.kontaktzeit})` : ""}
      </p>
    </div>

    ${kontakt.nachricht ? `
    <div style="margin-top: 16px; padding: 16px; background: #fff8f0; border-left: 3px solid #B85C3D;">
      <p style="margin: 0; font-size: 13px; color: #6B6B6B;">Persönliche Nachricht:</p>
      <p style="margin: 8px 0 0; font-size: 14px; font-style: italic;">${kontakt.nachricht}</p>
    </div>` : ""}

    <h2 style="font-size: 14px; font-weight: 500; margin-top: 24px; padding-bottom: 4px; border-bottom: 1px solid #ddd;">Reisedetails</h2>
    <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-top: 8px;">
      <tr><td style="padding: 3px 0; color: #6B6B6B; width: 140px;">Reisende</td><td>${reisende.erwachsene} Erw.${reisende.kinder > 0 ? `, ${reisende.kinder} Kind(er) (Alter: ${reisende.kinderAlter?.join(", ") || "–"})` : ""}</td></tr>
      <tr><td style="padding: 3px 0; color: #6B6B6B;">Zeitraum</td><td>${reisende.reisedatumVon} – ${reisende.reisedatumBis}${reisende.flexibel ? " (flexibel)" : ""}</td></tr>
      <tr><td style="padding: 3px 0; color: #6B6B6B;">Dauer</td><td>${reisende.dauerTage} Tage</td></tr>
      <tr><td style="padding: 3px 0; color: #6B6B6B;">Ziel</td><td>${destination.ueberraschen ? "Überraschen Sie mich" + (destination.regionen?.length ? ` (${destination.regionen.join(", ")})` : "") : destination.destination || "–"}</td></tr>
      <tr><td style="padding: 3px 0; color: #6B6B6B;">Reiseart</td><td>${destination.reiseart.join(", ")}</td></tr>
      <tr><td style="padding: 3px 0; color: #6B6B6B;">Komfort</td><td style="text-transform: capitalize;">${stil.komfortLevel}</td></tr>
      ${stil.budgetProPerson ? `<tr><td style="padding: 3px 0; color: #6B6B6B;">Budget p.P.</td><td>${stil.budgetProPerson >= 30000 ? "über CHF 30\u2019000" : `CHF ${stil.budgetProPerson.toLocaleString("de-CH")}`}</td></tr>` : ""}
      ${stil.wichtig.length > 0 ? `<tr><td style="padding: 3px 0; color: #6B6B6B;">Wichtig</td><td>${stil.wichtig.join(", ")}</td></tr>` : ""}
    </table>
  </div>
</body>
</html>`;
}

/**
 * Sendet E-Mails via Resend (wenn RESEND_API_KEY gesetzt)
 * oder via Ethereal als Fallback (lokal/Test).
 */
export async function sendAnfrageEmails(anfrage: AnfrageMitId): Promise<void> {
  const customerHtml = buildCustomerEmailHtml(anfrage);
  const agencyHtml = buildAgencyEmailHtml(anfrage);

  if (resend) {
    // ── Resend (Produktion) ──
    console.log("[Email] Versand via Resend...");

    const fromAddress = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    const [customerResult, agencyResult] = await Promise.all([
      resend.emails.send({
        from: `${AGENCY_NAME} <${fromAddress}>`,
        to: [anfrage.kontakt.email],
        subject: `Ihre Reiseanfrage – ${AGENCY_NAME}`,
        html: customerHtml,
      }),
      resend.emails.send({
        from: `Anfrage-System <${fromAddress}>`,
        to: [process.env.AGENCY_NOTIFY_EMAIL || AGENCY_EMAIL],
        subject: `Neue Anfrage von ${anfrage.kontakt.vorname} ${anfrage.kontakt.nachname}`,
        html: agencyHtml,
      }),
    ]);

    console.log("[Email] Bestätigung an Kunden gesendet (Resend ID: %s)", customerResult.data?.id);
    console.log("[Email] Benachrichtigung an Agentur gesendet (Resend ID: %s)", agencyResult.data?.id);
  } else {
    // ── Ethereal Fallback (lokal/Test) ──
    console.log("[Email] Kein RESEND_API_KEY gefunden – verwende Ethereal (Test-Modus)...");

    const transporter = await createEtherealTransporter();

    const customerInfo = await transporter.sendMail({
      from: `"${AGENCY_NAME}" <noreply@swisstravel-solutions.ch>`,
      to: anfrage.kontakt.email,
      subject: `Ihre Reiseanfrage – ${AGENCY_NAME}`,
      html: customerHtml,
    });

    console.log(
      "[Email] Bestätigung an Kunden (Ethereal-Vorschau): %s",
      nodemailer.getTestMessageUrl(customerInfo)
    );

    const agencyInfo = await transporter.sendMail({
      from: `"Anfrage-System" <system@swisstravel-solutions.ch>`,
      to: AGENCY_EMAIL,
      subject: `Neue Anfrage von ${anfrage.kontakt.vorname} ${anfrage.kontakt.nachname}`,
      html: agencyHtml,
    });

    console.log(
      "[Email] Benachrichtigung an Agentur (Ethereal-Vorschau): %s",
      nodemailer.getTestMessageUrl(agencyInfo)
    );
  }
}
