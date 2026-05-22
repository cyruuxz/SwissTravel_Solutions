import { destinationen, regionen } from "@/content/destinationen";
import { DestinationGrid } from "@/components/destinationen/destination-grid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinationen",
  description:
    "Entdecken Sie unsere handverlesenen Reiseziele – von Patagonien über Marokko bis Japan. Persönlich geplant, massgeschneidert für Sie.",
};

export default function DestinationenPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Destinationen
        </p>
        <h1 className="mt-4 max-w-2xl font-serif text-4xl lg:text-5xl">
          Wohin darf die Reise gehen?
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Eine Auswahl unserer beliebtesten Reiseziele. Jede Reise wird
          individuell für Sie geplant – diese Routen dienen als Inspiration.
        </p>

        <DestinationGrid destinationen={destinationen} regionen={regionen} />
      </div>
    </div>
  );
}
