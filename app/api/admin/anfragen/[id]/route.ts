import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "anfragen.json");

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Props) {
  const { id } = await params;

  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const anfragen = JSON.parse(data);
    const anfrage = anfragen.find((a: { id: string }) => a.id === id);

    if (!anfrage) {
      return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
    }

    return NextResponse.json(anfrage);
  } catch {
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Props) {
  const { id } = await params;

  try {
    const updates = await request.json();
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const anfragen = JSON.parse(data);
    const index = anfragen.findIndex((a: { id: string }) => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
    }

    // Status, Notizen, Angebot aktualisieren
    if (updates.status) {
      anfragen[index].metadaten.status = updates.status;
    }
    if (updates.notizen !== undefined) {
      anfragen[index].notizen = updates.notizen;
    }
    if (updates.angebot !== undefined) {
      anfragen[index].angebot = updates.angebot;
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(anfragen, null, 2), "utf-8");

    return NextResponse.json(anfragen[index]);
  } catch {
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
