import Link from "next/link";

const footerLinks = {
  reisen: [
    { name: "Destinationen", href: "/destinationen" },
    { name: "Rundreisen", href: "/destinationen?art=rundreisen" },
    { name: "Safari", href: "/destinationen?art=safari" },
    { name: "Strand & Erholung", href: "/destinationen?art=strand" },
    { name: "Aktiv & Wandern", href: "/destinationen?art=aktiv" },
  ],
  unternehmen: [
    { name: "Über uns", href: "/ueber-uns" },
    { name: "Kontakt", href: "/kontakt" },
    { name: "Anfrage stellen", href: "/anfrage" },
  ],
  kontakt: {
    adresse: ["SwissTravel Solutions AG", "Bahnhofstrasse 12", "5600 Lenzburg"],
    telefon: "+41 62 891 00 00",
    email: "info@swisstravel-solutions.ch",
  },
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Spalte 1: Über */}
          <div>
            <Link href="/" className="inline-block">
              <span className="font-serif text-xl tracking-tight">
                SwissTravel
              </span>
              <span className="ml-1 text-xs tracking-widest uppercase text-muted-foreground">
                Solutions
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Persönlich geplante Reisen aus Lenzburg. Schweizer Reiseexpertise
              seit 1987.
            </p>
          </div>

          {/* Spalte 2: Reisen */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Reisen
            </p>
            <ul className="mt-4 space-y-3">
              {footerLinks.reisen.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Spalte 3: Unternehmen */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Unternehmen
            </p>
            <ul className="mt-4 space-y-3">
              {footerLinks.unternehmen.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Spalte 4: Kontakt */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Kontakt
            </p>
            <div className="mt-4 space-y-3 text-sm text-foreground/70">
              {footerLinks.kontakt.adresse.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p className="pt-2">
                <a
                  href={`tel:${footerLinks.kontakt.telefon.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-foreground"
                >
                  {footerLinks.kontakt.telefon}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${footerLinks.kontakt.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {footerLinks.kontakt.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SwissTravel Solutions AG. Alle
            Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link
              href="/datenschutz"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Datenschutz
            </Link>
            <Link
              href="/impressum"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
