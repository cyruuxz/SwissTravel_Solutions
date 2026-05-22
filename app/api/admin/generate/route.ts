import { NextResponse } from "next/server";
import { generateAngebot } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const anfrage = await request.json();
    const angebot = await generateAngebot(anfrage);

    return NextResponse.json({ angebot });
  } catch (error) {
    console.error("[AI] Fehler:", error);
    return NextResponse.json(
      { error: "Fehler bei der Angebotserstellung." },
      { status: 500 }
    );
  }
}
