import Anthropic from "@anthropic-ai/sdk";
import { destinationen } from "@/content/destinationen";

const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

type AnfrageData = {
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
    nachricht?: string;
  };
};

function buildPrompt(anfrage: AnfrageData): string {
  const dest = anfrage.destination;
  const stil = anfrage.stil;
  const reisende = anfrage.reisende;

  // Passende Destinationen aus dem Katalog finden
  const passend = destinationen.filter((d) => {
    if (dest.destination) {
      const q = dest.destination.toLowerCase();
      return (
        d.titel.toLowerCase().includes(q) ||
        d.eyebrow.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        d.slug.toLowerCase().includes(q)
      );
    }
    if (dest.regionen && dest.regionen.length > 0) {
      return dest.regionen.includes(d.region);
    }
    return true;
  });

  // Detaillierte Kataloginfos für passende Destinationen
  const passendeDestinationen = passend
    .map((d) => {
      const route = d.reiseroute
        .map((r) => `  Tag ${r.tag}: ${r.titel} – ${r.beschreibung}`)
        .join("\n");
      const leistungen = d.inklusivLeistungen
        .map((l) => `  - ${l}`)
        .join("\n");
      const highlights = d.highlights.map((h) => `  - ${h}`).join("\n");
      return `### ${d.titel} (${d.eyebrow})
- Region: ${d.region}
- Reiseart: ${d.reiseart.join(", ")}
- Dauer: ${d.dauer} Tage
- Preis ab: CHF ${d.preisAb.toLocaleString("de-CH")} pro Person
- Beste Reisezeit: ${d.besteReisezeit}
- Beschreibung: ${d.beschreibung}

Highlights:
${highlights}

Inklusive Leistungen:
${leistungen}

Reiseroute:
${route}`;
    })
    .join("\n\n");

  // Fehlende Informationen identifizieren
  const fehlend: string[] = [];
  if (!dest.destination && !dest.ueberraschen) fehlend.push("Destination ist unklar");
  if (!stil.budgetProPerson) fehlend.push("Budget wurde nicht angegeben");
  if (!reisende.reisedatumVon || !reisende.reisedatumBis) fehlend.push("Reisedatum fehlt");
  if (reisende.kinder > 0 && (!reisende.kinderAlter || reisende.kinderAlter.length === 0)) {
    fehlend.push("Alter der Kinder nicht angegeben");
  }

  return `Du bist ein erfahrener Reiseberater bei SwissTravel Solutions, einem Schweizer Reisebüro in Lenzburg. Erstelle ein persönliches Reiseangebot basierend auf folgender Kundenanfrage.

## Kundenanfrage

**Kunde:** ${anfrage.kontakt.vorname} ${anfrage.kontakt.nachname}
**Reisende:** ${reisende.erwachsene} Erwachsene${reisende.kinder > 0 ? `, ${reisende.kinder} Kinder (Alter: ${reisende.kinderAlter?.join(", ") || "unbekannt"})` : ""}
**Reisezeitraum:** ${reisende.reisedatumVon || "nicht angegeben"} bis ${reisende.reisedatumBis || "nicht angegeben"}${reisende.flexibel ? " (± 1 Woche flexibel)" : ""}
**Gewünschte Dauer:** ${reisende.dauerTage} Tage
**Destination:** ${dest.ueberraschen ? `Überraschung gewünscht (bevorzugte Regionen: ${dest.regionen?.join(", ") || "alle"})` : dest.destination || "nicht angegeben"}
**Reiseart:** ${dest.reiseart.join(", ")}
**Komfort-Level:** ${stil.komfortLevel}
**Budget pro Person:** ${stil.budgetProPerson ? `CHF ${stil.budgetProPerson.toLocaleString("de-CH")}` : "nicht angegeben"}
**Wichtig:** ${stil.wichtig.length > 0 ? stil.wichtig.join(", ") : "keine besonderen Wünsche"}
${anfrage.kontakt.nachricht ? `**Persönliche Nachricht:** ${anfrage.kontakt.nachricht}` : ""}

## Unser Katalog (passende Reisen)
${passendeDestinationen || "Keine exakte Übereinstimmung im Katalog. Erstelle ein massgeschneidertes Angebot."}

${fehlend.length > 0 ? `## Fehlende Informationen\n${fehlend.map((f) => `- ${f}`).join("\n")}\n` : ""}

## Aufgabe

Erstelle ein professionelles Reiseangebot im folgenden Format:

1. **Begrüssung** – Persönlich, mit dem Namen des Kunden. Schweizer Hochdeutsch (ss statt ß).

2. **Reisevorschlag** – Eine konkrete Reise, die zu den Wünschen passt:
   - Destination und Titel
   - Reisedauer und empfohlener Zeitraum
   - Kurze Beschreibung (2-3 Sätze, editorial, nicht werblich)

3. **Reiseroute** – Tag-für-Tag-Programm (kurz, 1-2 Sätze pro Tag). Basiere dies auf der Reiseroute aus unserem Katalog, passe sie aber an die gewünschte Dauer und Reiseart an.

4. **Inklusive Leistungen** – Auflistung (Flüge, Hotels, Transfers, etc.). Orientiere dich an den Leistungen aus unserem Katalog.

5. **Preisübersicht** – Erstelle eine detaillierte Preisaufstellung:
   - Gliedere den Preis in Einzelposten auf:
     • Flüge (ab Zürich, Economy/Business je nach Komfort)
     • Unterkünfte (Nächte × Preis pro Nacht, Hotelkategorie angeben)
     • Transfers und Transport vor Ort
     • Aktivitäten und Eintritte
     • Verpflegung (Halb-/Vollpension)
   - Basiere auf unseren Katalogpreisen als Orientierung
   - Aufpreis für Komfort-Level: Standard (Basis), Komfort (+15%), Premium (+25-35%), Luxus (+50-80%)
   - Kinderermässigung: ca. 30% günstiger
   - Zeige am Ende: **Preis pro Person** und **Gesamtpreis** für alle Reisenden
   - Falls Budget angegeben: Passe das Angebot ans Budget an. Falls es nicht reicht, erkläre ehrlich, was möglich wäre.
   - Die Preise müssen realistisch und marktüblich sein für Schweizer Reisebüros.

${fehlend.length > 0 ? `6. **Rückfragen** – Formuliere höfliche, konkrete Fragen zu den fehlenden Informationen. Z.B. "Dürfen wir fragen, welches Budget Sie sich pro Person vorstellen?"` : ""}

7. **Abschluss** – Persönlich, einladend zu einem Gespräch oder Telefonat.

## Wichtige Regeln
- Schreibe in Schweizer Hochdeutsch (ss statt ß).
- Sei warm aber professionell – wie ein erfahrener Reiseberater, nicht wie eine Maschine.
- Verwende CHF als Währung.
- Verwende die Katalogpreise als Grundlage – erfinde keine unrealistischen Preise.
- Falls keine passende Destination im Katalog ist, erstelle ein massgeschneidertes Angebot mit realistischen Preisen.
- Nenne konkrete Hotels/Unterkünfte passend zum Komfort-Level (z.B. "4-Stern Boutique-Hotel" oder "5-Stern Resort").`;
}

export async function generateAngebot(anfrage: AnfrageData): Promise<string> {
  if (!client) {
    return `⚠ Kein ANTHROPIC_API_KEY konfiguriert.

Um KI-generierte Angebote zu nutzen, setze den API-Key in der .env.local:
ANTHROPIC_API_KEY=sk-ant-...

Du kannst dir einen kostenlosen Key holen auf console.anthropic.com (5$ Startguthaben).

─────────────────────────────

Manuelle Angebotsvorlage:

Guten Tag ${anfrage.kontakt.vorname} ${anfrage.kontakt.nachname},

Vielen Dank für Ihre Reiseanfrage. Gerne stellen wir für Sie ein passendes Angebot zusammen.

Ihre Wünsche:
- Reiseart: ${anfrage.destination.reiseart.join(", ")}
- Destination: ${anfrage.destination.destination || "offen"}
- Komfort-Level: ${anfrage.stil.komfortLevel}
- Dauer: ${anfrage.reisende.dauerTage} Tage
- Reisende: ${anfrage.reisende.erwachsene} Erwachsene${anfrage.reisende.kinder > 0 ? `, ${anfrage.reisende.kinder} Kinder` : ""}

[Hier Angebot einfügen]

Herzliche Grüsse,
Ihr SwissTravel Solutions Team`;
  }

  const prompt = buildPrompt(anfrage);

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 3000,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = message.content.find((block) => block.type === "text");
  return textBlock?.text || "Fehler bei der Angebotserstellung.";
}
