import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { destinationen, reisearten } from "@/content/destinationen";

export default function Home() {
  const featuredStories = destinationen.slice(0, 3);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative h-screen min-h-[600px] max-h-[1000px]">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85"
          alt="Berglandschaft mit See in der Morgendämmerung"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10" />

        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">
              Schweizer Reiseexpertise seit 1987
            </p>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl text-white sm:text-5xl lg:text-7xl">
              Reisen, die zu Ihnen passen.
            </h1>
            <p className="mt-5 max-w-lg text-base text-white/80 lg:text-lg">
              Persönlich geplant in Lenzburg. Massgeschneidert für unsere Kunden
              weltweit.
            </p>
            <Link
              href="/anfrage"
              className="mt-8 inline-flex items-center gap-2 border border-white/40 px-7 py-3.5 text-sm tracking-wide text-white transition-all hover:border-white hover:bg-white hover:text-foreground"
            >
              Reise anfragen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Unser Ansatz ─── */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Unser Ansatz
          </p>
          <h2 className="mt-4 max-w-xl font-serif text-3xl lg:text-4xl">
            Reisen beginnen mit einem Gespräch.
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            <div>
              <h3 className="font-serif text-xl lg:text-2xl">
                Beratung von Mensch zu Mensch.
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Kein Callcenter, kein Algorithmus. Bei uns sprechen Sie direkt
                mit der Person, die Ihre Reise plant – von der ersten Idee bis
                zur Rückkehr. Wir hören zu, bevor wir vorschlagen.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl lg:text-2xl">
                Reiseexperten mit über 30 Jahren Erfahrung.
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Unser Team kennt die Orte, die wir empfehlen, aus eigener
                Erfahrung. Wir waren in den Hotels, haben die Routen getestet
                und die lokalen Partner persönlich ausgewählt.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl lg:text-2xl">
                Vor, während und nach Ihrer Reise an Ihrer Seite.
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Unsere Betreuung endet nicht am Flughafen. Während der Reise
                sind wir erreichbar, und danach freuen wir uns auf Ihre
                Geschichten – die sind oft der Anfang der nächsten Reise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Reisearten (asymmetrisches Grid) ─── */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Reisearten
          </p>
          <h2 className="mt-4 font-serif text-3xl lg:text-4xl">
            Wie möchten Sie reisen?
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
            {reisearten.map((art, i) => {
              // Asymmetrisches Layout: erstes und fünftes Element gross
              const isLarge = i === 0 || i === 4;
              return (
                <Link
                  key={art.name}
                  href={`/destinationen?art=${encodeURIComponent(art.name.toLowerCase())}`}
                  className={`group relative overflow-hidden ${
                    isLarge ? "sm:col-span-2 lg:col-span-2 lg:row-span-1" : ""
                  }`}
                >
                  <div
                    className={`relative w-full overflow-hidden ${
                      isLarge ? "h-72 lg:h-80" : "h-56 lg:h-72"
                    }`}
                  >
                    <Image
                      src={art.image}
                      alt={art.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="font-serif text-xl text-white lg:text-2xl">
                        {art.name}
                      </h3>
                      <p className="mt-1 text-sm text-white/70">
                        {art.beschreibung}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Ausgewählte Reisen (Stories) ─── */}
      <section className="border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Inspirationen
          </p>
          <h2 className="mt-4 font-serif text-3xl lg:text-4xl">
            Eine Auswahl unserer Reisen
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {featuredStories.map((story) => (
              <Link
                key={story.slug}
                href={`/destinationen/${story.slug}`}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={story.cardImage}
                    alt={story.titel}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {story.eyebrow}
                  </p>
                  <h3 className="mt-2 font-serif text-xl lg:text-2xl">
                    {story.titel}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {story.beschreibung}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{story.dauer} Tage</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                    <span>
                      ab CHF{" "}
                      {story.preisAb.toLocaleString("de-CH")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/destinationen"
              className="inline-flex items-center gap-2 text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              Alle Destinationen entdecken
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="bg-muted py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Kundenstimmen
          </p>

          <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-3">
            <blockquote>
              <p className="font-serif text-xl leading-relaxed lg:text-2xl">
                «Wir hätten diese Reise nie selbst so planen können. Jedes
                Detail hat gepasst – von der kleinen Riad in Fes bis zur
                Sterne-Nacht in der Wüste.»
              </p>
              <footer className="mt-6 text-sm text-muted-foreground">
                Familie K., Marokko 2025
              </footer>
            </blockquote>

            <blockquote>
              <p className="font-serif text-xl leading-relaxed lg:text-2xl">
                «Was uns überzeugt: SwissTravel kennt die Orte wirklich. Das
                spürt man auf jeder Etappe.»
              </p>
              <footer className="mt-6 text-sm text-muted-foreground">
                Herr und Frau M., Japan 2024
              </footer>
            </blockquote>

            <blockquote>
              <p className="font-serif text-xl leading-relaxed lg:text-2xl">
                «Eine Reise, die ich nie vergessen werde. Danke für das
                aufmerksame Zuhören schon beim ersten Gespräch.»
              </p>
              <footer className="mt-6 text-sm text-muted-foreground">
                Sara B., Patagonien 2025
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-accent py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="font-serif text-3xl text-accent-foreground lg:text-4xl">
            Bereit für die nächste Reise?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-accent-foreground/70">
            Erzählen Sie uns von Ihrem Wunsch – wir melden uns innerhalb von 24
            Stunden.
          </p>
          <Link
            href="/anfrage"
            className="mt-8 inline-flex items-center gap-2 border border-accent-foreground/40 px-7 py-3.5 text-sm tracking-wide text-accent-foreground transition-all hover:bg-accent-foreground hover:text-accent"
          >
            Anfrage stellen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
