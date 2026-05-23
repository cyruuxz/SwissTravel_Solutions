import { kv } from "@vercel/kv";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "anfragen.json");
const KV_KEY = "anfragen";

// Prüfe ob Vercel KV verfügbar ist
function useKV(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export type AnfrageRecord = {
  id: string;
  reisende: {
    erwachsene: number;
    kinder: number;
    kinderAlter?: number[];
    reisedatumVon: string;
    reisedatumBis: string;
    flexibel: boolean;
    dauerTage: number;
  };
  destination: {
    destination?: string;
    ueberraschen: boolean;
    regionen?: string[];
    reiseart: string[];
  };
  stil: {
    komfortLevel: string;
    budgetProPerson?: number;
    wichtig: string[];
  };
  kontakt: {
    vorname: string;
    nachname: string;
    email: string;
    telefon?: string;
    kontaktweg?: string;
    kontaktzeit?: string;
    nachricht?: string;
    datenschutz?: boolean;
  };
  metadaten: {
    quelleDestination?: string;
    eingegangenAm: string;
    status: string;
  };
  angebot?: string;
  notizen?: string;
};

// Alle Anfragen laden
export async function getAnfragen(): Promise<AnfrageRecord[]> {
  if (useKV()) {
    const data = await kv.get<AnfrageRecord[]>(KV_KEY);
    return data || [];
  }

  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Einzelne Anfrage laden
export async function getAnfrage(
  id: string
): Promise<AnfrageRecord | null> {
  const anfragen = await getAnfragen();
  return anfragen.find((a) => a.id === id) || null;
}

// Neue Anfrage speichern
export async function saveAnfrage(
  anfrage: AnfrageRecord
): Promise<void> {
  const anfragen = await getAnfragen();
  anfragen.push(anfrage);

  if (useKV()) {
    await kv.set(KV_KEY, anfragen);
  } else {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(anfragen, null, 2), "utf-8");
  }
}

// Anfrage aktualisieren
export async function updateAnfrage(
  id: string,
  updates: Partial<{
    status: string;
    notizen: string;
    angebot: string;
  }>
): Promise<AnfrageRecord | null> {
  const anfragen = await getAnfragen();
  const index = anfragen.findIndex((a) => a.id === id);

  if (index === -1) return null;

  if (updates.status) {
    anfragen[index].metadaten.status = updates.status;
  }
  if (updates.notizen !== undefined) {
    anfragen[index].notizen = updates.notizen;
  }
  if (updates.angebot !== undefined) {
    anfragen[index].angebot = updates.angebot;
  }

  if (useKV()) {
    await kv.set(KV_KEY, anfragen);
  } else {
    await fs.writeFile(DATA_FILE, JSON.stringify(anfragen, null, 2), "utf-8");
  }

  return anfragen[index];
}
