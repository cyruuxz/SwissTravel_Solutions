import { NextResponse } from "next/server";
import { anfrageSchema } from "@/lib/schemas";
import { sendAnfrageEmails } from "@/lib/email";
import { saveAnfrage } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = anfrageSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Ungültige Daten", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const anfrage = {
      ...result.data,
      metadaten: {
        quelleDestination: result.data.destination.destination || undefined,
        eingegangenAm: new Date().toISOString(),
        status: "neu" as const,
      },
      id: crypto.randomUUID(),
    };

    await saveAnfrage(anfrage);

    // E-Mails senden (Fehler blockieren die Anfrage nicht)
    try {
      await sendAnfrageEmails(anfrage);
    } catch (emailError) {
      console.error("[Email] Fehler beim Senden:", emailError);
    }

    return NextResponse.json(
      { success: true, id: anfrage.id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Serverfehler. Bitte versuchen Sie es später erneut." },
      { status: 500 }
    );
  }
}
