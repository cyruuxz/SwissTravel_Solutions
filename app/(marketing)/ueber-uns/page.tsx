import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "SwissTravel Solutions – ein inhabergeführtes Reiseunternehmen aus Lenzburg. Seit 1987 planen wir massgeschneiderte Reisen.",
};

const team = [
  {
    name: "Thomas Wegmüller",
    rolle: "Gründer & Geschäftsführer",
    beschreibung:
      "Thomas hat SwissTravel Solutions 1987 gegründet und kennt die Welt wie seine Westentasche. Seine Leidenschaft: unentdeckte Orte in Südamerika.",
    bild: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Sandra Wegmüller-Roth",
    rolle: "Reiseberatung & Kundenbetreuung",
    beschreibung:
      "Sandra sorgt dafür, dass jede Reise genau passt. Sie kennt die besten Familienhotels in Europa und hat ein untrügliches Gespür für Details.",
    bild: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
  {
    name: "Vincent Meier",
    rolle: "Spezialist Afrika & Orient",
    beschreibung:
      "Vincent kennt jedes Hotel in Marrakesch persönlich. Seine Safari-Routen in Ostafrika sind legendär unter unseren Stammkunden.",
    bild: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
  },
  {
    name: "Lena Fischer",
    rolle: "Spezialistin Asien & Ozeanien",
    beschreibung:
      "Lena hat drei Jahre in Japan gelebt und bereist Südostasien seit über einem Jahrzehnt. Ihre Insider-Tipps machen jede Reise besonders.",
    bild: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
  },
];

const werte = [
  {
    titel: "Persönlich statt anonym",
    text: "Bei uns sprechen Sie immer mit einem Menschen, der Ihre Reise kennt. Kein Ticket-System, kein Weiterleiten. Ihr Berater begleitet Sie von der ersten Idee bis zur Rückkehr – und oft auch darüber hinaus.",
  },
  {
    titel: "Qualität vor Quantität",
    text: "Wir planen bewusst weniger Reisen, dafür besser. Jede Route wird individuell zusammengestellt, jedes Hotel persönlich geprüft. Unser Anspruch ist nicht das günstigste Angebot, sondern das richtige.",
  },
  {
    titel: "Verantwortung unterwegs",
    text: "Wir arbeiten bevorzugt mit lokalen Partnern, empfehlen nachhaltige Unterkünfte und beraten ehrlich zu ökologisch sinnvollen Reiserouten. Reisen soll bereichern – die Reisenden und die bereisten Orte gleichermassen.",
  },
];

export default function UeberUnsPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Über uns
        </p>
        <h1 className="mt-4 max-w-2xl font-serif text-4xl lg:text-5xl">
          Seit 1987 planen wir Reisen, die in Erinnerung bleiben.
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <p className="text-lg leading-relaxed text-muted-foreground">
            SwissTravel Solutions ist ein inhabergeführtes Schweizer
            Reiseunternehmen mit Sitz in Lenzburg. Was als Ein-Mann-Betrieb von
            Thomas Wegmüller begann, ist heute ein kleines, eingespieltes Team
            von Reiseexperten – jeder mit eigenen Spezialgebieten und einer
            ehrlichen Leidenschaft für das Reisen.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Wir planen massgeschneiderte Reisen für Privatpersonen, Paare und
            Familien – immer mit dem Anspruch, mehr zu liefern als eine Reise:
            nämlich eine Erfahrung, die in Erinnerung bleibt. Nicht das
            Spektakulärste ist immer das Beste, sondern das, was wirklich zu
            Ihnen passt.
          </p>
        </div>
      </section>

      {/* Bild */}
      <section className="mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative aspect-[21/9] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1920&q=85"
              alt="Blick über eine weite Landschaft bei Sonnenuntergang"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mt-24 lg:mt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Unser Team
          </p>
          <h2 className="mt-4 font-serif text-3xl lg:text-4xl">
            Die Menschen hinter Ihrer Reise.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <div key={person.name}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={person.bild}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 font-serif text-lg">{person.name}</h3>
                <p className="text-sm text-muted-foreground">{person.rolle}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {person.beschreibung}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Werte */}
      <section className="mt-24 lg:mt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Unsere Werte
          </p>
          <h2 className="mt-4 font-serif text-3xl lg:text-4xl">
            Woran wir glauben.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
            {werte.map((wert) => (
              <div key={wert.titel}>
                <h3 className="font-serif text-xl">{wert.titel}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {wert.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
