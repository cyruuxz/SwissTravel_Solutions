import { Redis } from "@upstash/redis";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "anfragen.json");
const KV_KEY = "anfragen";

// Redis-Client erstellen wenn Credentials vorhanden
function getRedis(): Redis | null {
  const url =
    process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    return new Redis({ url, token });
  }
  return null;
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
  const redis = getRedis();
  if (redis) {
    const data = await redis.get<AnfrageRecord[]>(KV_KEY);
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

  const redis = getRedis();
  if (redis) {
    await redis.set(KV_KEY, anfragen);
  } else {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(
      DATA_FILE,
      JSON.stringify(anfragen, null, 2),
      "utf-8"
    );
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

  const redis = getRedis();
  if (redis) {
    await redis.set(KV_KEY, anfragen);
  } else {
    await fs.writeFile(
      DATA_FILE,
      JSON.stringify(anfragen, null, 2),
      "utf-8"
    );
  }

  return anfragen[index];
}
