"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Destinationen", href: "/destinationen" },
  { name: "Über uns", href: "/ueber-uns" },
  { name: "Kontakt", href: "/kontakt" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1">
            <span className="font-serif text-xl tracking-tight lg:text-2xl">
              SwissTravel
            </span>
            <span className="text-xs tracking-widest uppercase text-muted-foreground">
              Solutions
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/anfrage"
              className="ml-2 inline-flex items-center gap-1.5 border border-foreground/20 px-5 py-2 text-sm tracking-wide transition-colors hover:bg-foreground hover:text-background"
            >
              Anfrage stellen
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Menü schliessen" : "Menü öffnen"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border pb-6 pt-4">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/anfrage"
                className="mt-2 inline-flex w-fit items-center gap-1.5 border border-foreground/20 px-5 py-2.5 text-sm tracking-wide transition-colors hover:bg-foreground hover:text-background"
                onClick={() => setMobileOpen(false)}
              >
                Anfrage stellen
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
