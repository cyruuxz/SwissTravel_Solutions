import { NextResponse } from "next/server";
import { getAnfrage, updateAnfrage } from "@/lib/storage";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Props) {
  const { id } = await params;

  try {
    const anfrage = await getAnfrage(id);

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
    const updated = await updateAnfrage(id, updates);

    if (!updated) {
      return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
