import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, MapPin, Sun, Check } from "lucide-react";
import { destinationen } from "@/content/destinationen";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return destinationen.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = destinationen.find((d) => d.slug === slug);
  if (!dest) return {};
  return {
    title: dest.titel,
    description: dest.beschreibung,
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const dest = destinationen.find((d) => d.slug === slug);
  if (!dest) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[700px]">
        <Image
          src={dest.heroImage}
          alt={dest.titel}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-14 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">
              {dest.eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl font-serif text-3xl text-white sm:text-4xl lg:text-6xl">
              {dest.titel}
            </h1>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="lg:grid lg:grid-cols-3 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Intro */}
            <p className="text-lg leading-relaxed text-muted-foreground lg:text-xl">
              {dest.beschreibung}
            </p>

            {/* Was Sie erwartet */}
            <section className="mt-16">
              <h2 className="font-serif text-2xl lg:text-3xl">
                Was Sie erwartet
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {dest.wasErwartet}
              </p>
            </section>

            {/* Highlights */}
            <section className="mt-16">
              <h2 className="font-serif text-2xl lg:text-3xl">Highlights</h2>
              <ul className="mt-6 space-y-3">
                {dest.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Reiseroute */}
            <section className="mt-16">
              <h2 className="font-serif text-2xl lg:text-3xl">Reiseroute</h2>
              <div className="mt-8 space-y-0">
                {dest.reiseroute.map((tag, i) => (
                  <div
                    key={tag.tag}
                    className={`relative flex gap-6 pb-8 ${
                      i < dest.reiseroute.length - 1
                        ? "border-l border-border ml-3"
                        : "ml-3"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-accent" />
                    <div className="pl-6">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        Tag {tag.tag}
                      </p>
                      <h3 className="mt-1 font-serif text-lg">{tag.titel}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {tag.beschreibung}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inklusive Leistungen */}
            <section className="mt-16">
              <h2 className="font-serif text-2xl lg:text-3xl">
                Inklusive Leistungen
              </h2>
              <ul className="mt-6 space-y-3">
                {dest.inklusivLeistungen.map((l) => (
                  <li
                    key={l}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="mt-12 lg:mt-0">
            <div className="sticky top-28 space-y-8">
              {/* Eckdaten */}
              <div className="border border-border p-6">
                <h3 className="font-serif text-lg">Auf einen Blick</h3>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <dt className="text-muted-foreground">Region</dt>
                      <dd>{dest.eyebrow}</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <dt className="text-muted-foreground">Reisedauer</dt>
                      <dd>{dest.dauer} Tage</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sun className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <dt className="text-muted-foreground">
                        Beste Reisezeit
                      </dt>
                      <dd>{dest.besteReisezeit}</dd>
                    </div>
                  </div>
                </dl>
                <div className="mt-6 border-t border-border pt-6">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Ab Preis pro Person
                  </p>
                  <p className="mt-1 font-serif text-2xl">
                    CHF {dest.preisAb.toLocaleString("de-CH")}
                  </p>
                </div>

                <Link
                  href={`/anfrage?reise=${dest.slug}`}
                  className="mt-6 flex w-full items-center justify-center gap-2 bg-accent px-6 py-3.5 text-sm tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
                >
                  Reise anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Reisearten-Tags */}
              <div className="flex flex-wrap gap-2">
                {dest.reiseart.map((art) => (
                  <span
                    key={art}
                    className="inline-flex items-center border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {art}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
