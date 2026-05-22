# SwissTravel Solutions

Website für ein fiktives Schweizer Reisebüro. Gebaut mit Next.js 15, Tailwind CSS v4, shadcn/ui und TypeScript.

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **UI-Komponenten:** shadcn/ui (selektiv)
- **Formulare:** React Hook Form + Zod
- **Animationen:** Framer Motion (bereit, sparsam eingesetzt)
- **Icons:** Lucide React
- **Fonts:** Fraunces (Serif, Headlines) + Inter (Sans, Body) via next/font

## Voraussetzungen

- Node.js 18.18 oder höher
- npm 9 oder höher

## Lokale Entwicklung

```bash
# Repository klonen
git clone <repository-url>
cd swisstravel

# Dependencies installieren
npm install

# Environment-Variablen vorbereiten (optional)
cp .env.example .env.local

# Entwicklungsserver starten
npm run dev
```

Die Seite ist dann unter [http://localhost:3000](http://localhost:3000) erreichbar.

## Projektstruktur

```
swisstravel/
├── app/
│   ├── (marketing)/          # Öffentliche Seiten mit Header/Footer
│   │   ├── page.tsx          # Startseite
│   │   ├── destinationen/    # Übersicht und Detailseiten
│   │   ├── ueber-uns/        # Über-uns-Seite
│   │   └── kontakt/          # Kontaktseite
│   ├── anfrage/              # Multi-Step-Anfrageformular
│   │   ├── page.tsx          # Formular
│   │   └── danke/page.tsx    # Erfolgsseite
│   ├── api/
│   │   └── anfrage/route.ts  # POST-Handler für Anfragen
│   ├── (chat)/               # Vorbereitet für KI-Bot (leer)
│   ├── layout.tsx            # Root-Layout mit Fonts
│   └── globals.css           # Tailwind + Farbpalette
├── components/
│   ├── layout/               # Header, Footer
│   ├── anfrage/              # Formular-Steps
│   └── ui/                   # shadcn/ui-Komponenten
├── content/
│   └── destinationen.ts      # Statische Reisedaten
├── lib/
│   ├── schemas.ts            # Zod-Validierungsschemata
│   └── utils.ts              # Hilfsfunktionen
├── data/                     # Gespeicherte Anfragen (JSON)
└── public/
    └── fonts/                # Fraunces Variable Font
```

## Verfügbare Seiten

| Route | Beschreibung |
|---|---|
| `/` | Startseite mit Hero, Ansatz, Reisearten, Stories, Testimonials |
| `/destinationen` | Übersicht aller Reiseziele |
| `/destinationen/[slug]` | Detailseite einer Destination |
| `/ueber-uns` | Team, Geschichte, Werte |
| `/kontakt` | Adresse, Karte, Öffnungszeiten |
| `/anfrage` | Multi-Step-Anfrageformular (4 Schritte) |
| `/anfrage/danke` | Bestätigungsseite nach Anfrage |

## API

### POST `/api/anfrage`

Nimmt eine Reiseanfrage entgegen, validiert sie mit Zod und speichert sie in `data/anfragen.json`.

**Request Body:** Siehe `lib/schemas.ts` für die vollständige Typdefinition (`AnfrageFormData`).

**Response:**
- `201` – Anfrage erfolgreich gespeichert (`{ success: true, id: string }`)
- `400` – Validierungsfehler
- `500` – Serverfehler

## Anfrageformular

Das Formular ist in 4 Schritte aufgeteilt:

1. **Reisende & Zeitraum** – Anzahl Personen, Reisedatum, Dauer
2. **Destination** – Wunschziel oder «Überraschen Sie mich», Reiseart
3. **Stil & Budget** – Komfort-Level, Budget, Präferenzen
4. **Kontakt** – Persönliche Daten, bevorzugter Kontaktweg

Nach dem letzten Schritt wird eine Zusammenfassung angezeigt.

## Deployment auf Vercel

1. Repository auf GitHub pushen
2. [Vercel](https://vercel.com) Account erstellen und Repo importieren
3. Environment-Variablen setzen (falls E-Mail-Versand gewünscht)
4. Deployment erfolgt automatisch bei jedem Push

```bash
# Oder manuell via CLI
npm i -g vercel
vercel
```

## Design-Richtlinien

- **Editorial, nicht Marketing** – Texte wie in einem Reisemagazin
- **Fotografie an erster Stelle** – Grosse, hochwertige Bilder (Unsplash)
- **Typografie:** Fraunces (Serif) für Headlines, Inter (Sans) für Body
- **Max font-weight 500** – Keine fetten Headlines
- **Sentence case** überall – Keine TITLE CASE
- **Farbpalette:** Warmes Off-White (#F7F4EE), Anthrazit (#1A1A1A), Petrol (#2C4A52), Terracotta (#B85C3D, sparsam)
- **Kein Dark Mode** – Die Seite ist bewusst hell

## Zukünftige Erweiterungen

- KI-Chatbot für Erstabklärung (Route-Group `(chat)` vorbereitet)
- E-Mail-Benachrichtigung bei neuen Anfragen
- Journal / Reise-Blog
- CMS-Anbindung für dynamische Inhalte

## Sprache

Die Website verwendet Schweizer Hochdeutsch:
- «ss» statt «ß» (z. B. «massgeschneidert»)
- CHF als Währung
- Schweizer Begriffe (z. B. «Spital» statt «Krankenhaus»)
