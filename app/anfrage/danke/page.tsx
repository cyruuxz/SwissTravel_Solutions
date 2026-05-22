import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anfrage erhalten",
};

export default function DankePage() {
  return (
    <div className="flex min-h-[60vh] items-center pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto max-w-xl px-6 text-center lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Anfrage erhalten
        </p>
        <h1 className="mt-4 font-serif text-3xl lg:text-4xl">
          Wir freuen uns auf Ihre Reise.
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Ihre Anfrage ist bei uns eingegangen. Ein Mitglied unseres Teams wird
          sich innerhalb von 24 Stunden bei Ihnen melden – häufig auch
          schneller. In der Zwischenzeit stöbern Sie gerne durch unsere
          Reise-Inspirationen.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/destinationen"
            className="inline-flex items-center gap-2 bg-accent px-7 py-3.5 text-sm tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
          >
            Destinationen entdecken
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
