import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie SwissTravel Solutions in Lenzburg. Persönliche Beratung gerne nach Terminvereinbarung.",
};

export default function KontaktPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Kontakt
        </p>
        <h1 className="mt-4 max-w-xl font-serif text-4xl lg:text-5xl">
          Wir freuen uns auf Ihre Nachricht.
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Persönliche Beratung gerne nach Terminvereinbarung. Oder stellen Sie
          direkt eine unverbindliche Reiseanfrage.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Kontaktinformationen */}
          <div className="space-y-10">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <h2 className="font-serif text-lg">Adresse</h2>
                <p className="mt-1 text-muted-foreground">
                  SwissTravel Solutions AG
                  <br />
                  Bahnhofstrasse 12
                  <br />
                  5600 Lenzburg
                  <br />
                  Schweiz
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <h2 className="font-serif text-lg">Telefon</h2>
                <p className="mt-1">
                  <a
                    href="tel:+41628910000"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    +41 62 891 00 00
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <h2 className="font-serif text-lg">E-Mail</h2>
                <p className="mt-1">
                  <a
                    href="mailto:info@swisstravel-solutions.ch"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    info@swisstravel-solutions.ch
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <h2 className="font-serif text-lg">Öffnungszeiten</h2>
                <div className="mt-1 text-muted-foreground">
                  <p>Montag – Freitag: 08:30 – 17:30 Uhr</p>
                  <p>Samstag: 09:00 – 12:00 Uhr (nach Vereinbarung)</p>
                  <p>Sonntag: geschlossen</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/anfrage"
                className="inline-flex items-center gap-2 bg-accent px-7 py-3.5 text-sm tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
              >
                Reise anfragen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Karte (OpenStreetMap) */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden border border-border">
              <iframe
                title="Standort SwissTravel Solutions, Lenzburg"
                src="https://www.openstreetmap.org/export/embed.html?bbox=8.1700%2C47.3830%2C8.1900%2C47.3930&layer=mapnik&marker=47.3880%2C8.1800"
                className="h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Karte:{" "}
              <a
                href="https://www.openstreetmap.org/?mlat=47.3880&mlon=8.1800#map=15/47.3880/8.1800"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Auf OpenStreetMap ansehen
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
