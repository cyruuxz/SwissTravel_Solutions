import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "anfragen.json");
const AGENCY_NAME = "SwissTravel Solutions";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function buildAngebotEmailHtml(
  vorname: string,
  nachname: string,
  angebotText: string
): string {
  // Angebot-Text in HTML-Absätze umwandeln
  const htmlContent = angebotText
    .split("\n\n")
    .map((paragraph) => {
      if (paragraph.startsWith("# ")) {
        return `<h1 style="font-size: 22px; font-weight: 400; font-family: Georgia, serif; margin: 24px 0 8px;">${paragraph.slice(2)}</h1>`;
      }
      if (paragraph.startsWith("## ")) {
        return `<h2 style="font-size: 18px; font-weight: 400; font-family: Georgia, serif; margin: 24px 0 8px;">${paragraph.slice(3)}</h2>`;
      }
      // Zeilen mit - als Liste
      if (paragraph.includes("\n- ")) {
        const lines = paragraph.split("\n");
        const title = lines[0];
        const items = lines
          .slice(1)
          .filter((l) => l.startsWith("- "))
          .map((l) => `<li style="margin: 4px 0;">${l.slice(2)}</li>`)
          .join("");
        return `<p style="font-size: 14px; margin: 16px 0 4px; font-weight: 500;">${title}</p><ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #444;">${items}</ul>`;
      }
      // Bold Markdown (**text**)
      const formatted = paragraph
        .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 500;">$1</strong>')
        .replace(/\n/g, "<br>");
      return `<p style="font-size: 15px; line-height: 1.7; color: #333; margin: 12px 0;">${formatted}</p>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, Arial, sans-serif; color: #1A1A1A; background: #F7F4EE; margin: 0; padding: 0;">
  <div style="max-width: 640px; margin: 0 auto; padding: 40px 24px;">
    <div style="border-bottom: 1px solid #E8E2D8; padding-bottom: 20px; margin-bottom: 28px;">
      <h1 style="font-size: 22px; font-weight: 400; margin: 0; font-family: Georgia, serif;">SwissTravel Solutions</h1>
      <p style="color: #6B6B6B; font-size: 13px; margin: 6px 0 0;">Ihr persönliches Reiseangebot</p>
    </div>

    ${htmlContent}

    <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #E8E2D8; font-size: 12px; color: #999;">
      <p style="margin: 0;">
        SwissTravel Solutions AG · Bahnhofstrasse 12 · 5600 Lenzburg<br>
        +41 62 891 00 00 · info@swisstravel-solutions.ch
      </p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const { anfrageId, angebotText, kundeEmail, vorname, nachname } =
      await request.json();

    if (!angebotText || !kundeEmail) {
      return NextResponse.json(
        { error: "Angebot oder E-Mail fehlt." },
        { status: 400 }
      );
    }

    const emailHtml = buildAngebotEmailHtml(vorname, nachname, angebotText);
    const subject = `Ihr Reiseangebot – ${AGENCY_NAME}`;

    let resendOk = false;
    let previewUrl = "";

    // 1) Immer Ethereal für zuverlässige Vorschau
    try {
      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });

      const info = await transporter.sendMail({
        from: `"${AGENCY_NAME}" <noreply@swisstravel-solutions.ch>`,
        to: kundeEmail,
        subject,
        html: emailHtml,
      });

      previewUrl = nodemailer.getTestMessageUrl(info) || "";
      console.log("[Angebot] Ethereal-Vorschau: %s", previewUrl);
    } catch (etherealError) {
      console.error("[Angebot] Ethereal fehlgeschlagen:", etherealError);
    }

    // 2) Resend versuchen (echte Zustellung)
    if (resend) {
      try {
        const fromAddress =
          process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
        const result = await resend.emails.send({
          from: `${AGENCY_NAME} <${fromAddress}>`,
          to: [kundeEmail],
          subject,
          html: emailHtml,
        });
        resendOk = true;
        console.log(
          "[Angebot] Resend an %s gesendet. ID: %s",
          kundeEmail,
          result.data?.id
        );
      } catch (resendError) {
        console.error("[Angebot] Resend fehlgeschlagen:", resendError);
      }
    }

    // Status auf "angebot-gesendet" aktualisieren
    if (anfrageId) {
      try {
        const data = await fs.readFile(DATA_FILE, "utf-8");
        const anfragen = JSON.parse(data);
        const index = anfragen.findIndex(
          (a: { id: string }) => a.id === anfrageId
        );
        if (index !== -1) {
          anfragen[index].metadaten.status = "angebot-gesendet";
          anfragen[index].angebot = angebotText;
          await fs.writeFile(
            DATA_FILE,
            JSON.stringify(anfragen, null, 2),
            "utf-8"
          );
        }
      } catch {
        console.error("[Angebot] Status-Update fehlgeschlagen");
      }
    }

    return NextResponse.json({
      success: true,
      resendOk,
      previewUrl: previewUrl || undefined,
    });
  } catch (error) {
    console.error("[Angebot] Fehler:", error);
    return NextResponse.json(
      { error: "Fehler beim Versand." },
      { status: 500 }
    );
  }
}
