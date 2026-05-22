"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Destination } from "@/content/destinationen";

type Props = {
  destinationen: Destination[];
  regionen: string[];
};

export function DestinationGrid({ destinationen, regionen }: Props) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const filtered = activeRegion
    ? destinationen.filter((d) => d.region === activeRegion)
    : destinationen;

  return (
    <>
      {/* Regionen-Filter */}
      <div className="mt-10 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveRegion(null)}
          className={`inline-flex items-center px-4 py-2 text-sm border transition-colors ${
            activeRegion === null
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          }`}
        >
          Alle
        </button>
        {regionen.map((region) => (
          <button
            key={region}
            type="button"
            onClick={() => setActiveRegion(region)}
            className={`inline-flex items-center px-4 py-2 text-sm border transition-colors ${
              activeRegion === region
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((dest) => (
            <motion.div
              key={dest.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href={`/destinationen/${dest.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={dest.cardImage}
                    alt={dest.titel}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {dest.eyebrow}
                  </p>
                  <h2 className="mt-1.5 font-serif text-xl lg:text-2xl">
                    {dest.titel}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {dest.beschreibung}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{dest.dauer} Tage</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                    <span>
                      ab CHF {dest.preisAb.toLocaleString("de-CH")}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
