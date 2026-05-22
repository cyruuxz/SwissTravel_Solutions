"use client";

import {
  Plane,
  Hotel,
  Compass,
  Map,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

type Anfrage = {
  reisende: {
    erwachsene: number;
    kinder: number;
    reisedatumVon: string;
    reisedatumBis: string;
    dauerTage: number;
  };
  destination: {
    destination?: string;
    ueberraschen: boolean;
    regionen?: string[];
    reiseart: string[];
  };
  stil: {
    komfortLevel: string;
    budgetProPerson?: number;
  };
  kontakt: {
    vorname: string;
    nachname: string;
  };
};

// Destination → Suchbegriffe für Buchungsportale
const destinationMap: Record<
  string,
  { flights: string; hotels: string; city: string; country: string }
> = {
  patagonien: {
    flights: "Buenos+Aires",
    hotels: "El+Calafate",
    city: "Patagonia",
    country: "Argentina",
  },
  marokko: {
    flights: "Marrakech",
    hotels: "Marrakech",
    city: "Marrakech",
    country: "Morocco",
  },
  marrakesch: {
    flights: "Marrakech",
    hotels: "Marrakech",
    city: "Marrakech",
    country: "Morocco",
  },
  japan: {
    flights: "Tokyo",
    hotels: "Tokyo",
    city: "Tokyo",
    country: "Japan",
  },
  island: {
    flights: "Reykjavik",
    hotels: "Reykjavik",
    city: "Reykjavik",
    country: "Iceland",
  },
  tansania: {
    flights: "Kilimanjaro",
    hotels: "Arusha",
    city: "Serengeti",
    country: "Tanzania",
  },
  norwegen: {
    flights: "Bergen",
    hotels: "Bergen",
    city: "Bergen",
    country: "Norway",
  },
  neuseeland: {
    flights: "Auckland",
    hotels: "Auckland",
    city: "Auckland",
    country: "New+Zealand",
  },
  vietnam: {
    flights: "Hanoi",
    hotels: "Hanoi",
    city: "Hanoi",
    country: "Vietnam",
  },
  griechenland: {
    flights: "Athens",
    hotels: "Athens",
    city: "Athens",
    country: "Greece",
  },
  "costa rica": {
    flights: "San+Jose+Costa+Rica",
    hotels: "San+Jose+Costa+Rica",
    city: "Costa+Rica",
    country: "Costa+Rica",
  },
  "sri lanka": {
    flights: "Colombo",
    hotels: "Colombo",
    city: "Colombo",
    country: "Sri+Lanka",
  },
  namibia: {
    flights: "Windhoek",
    hotels: "Windhoek",
    city: "Windhoek",
    country: "Namibia",
  },
};

function findDestination(query: string | undefined) {
  if (!query) return null;
  const q = query.toLowerCase();
  for (const [key, value] of Object.entries(destinationMap)) {
    if (q.includes(key)) return value;
  }
  // Fallback: nutze die Eingabe direkt
  return {
    flights: encodeURIComponent(query),
    hotels: encodeURIComponent(query),
    city: encodeURIComponent(query),
    country: encodeURIComponent(query),
  };
}

function formatDateParam(dateStr: string): string {
  if (!dateStr) return "";
  return dateStr; // Already in YYYY-MM-DD format
}

function LinkButton({
  href,
  icon: Icon,
  label,
  sublabel,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sublabel: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-md border border-gray-200 bg-white px-4 py-3 transition-colors hover:border-[#2C4A52]/30 hover:bg-[#2C4A52]/5"
    >
      <Icon className="h-4 w-4 shrink-0 text-[#2C4A52]" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="truncate text-xs text-gray-500">{sublabel}</p>
      </div>
      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-gray-400" />
    </a>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 transition-colors hover:bg-gray-50"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-500" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {copied ? "Kopiert" : label}
    </button>
  );
}

export default function BuchungsLinks({
  anfrage,
}: {
  anfrage: Anfrage;
}) {
  const dest = findDestination(anfrage.destination.destination);
  const checkin = formatDateParam(anfrage.reisende.reisedatumVon);
  const checkout = formatDateParam(anfrage.reisende.reisedatumBis);
  const adults = anfrage.reisende.erwachsene;
  const children = anfrage.reisende.kinder;
  const destName = anfrage.destination.destination || "Reiseziel";

  // Sterne basierend auf Komfort-Level
  const starMap: Record<string, string> = {
    standard: "3",
    komfort: "4",
    premium: "4,5",
    luxus: "5",
  };
  const stars = starMap[anfrage.stil.komfortLevel] || "4";

  // Booking.com Suchlink
  const bookingUrl = dest
    ? `https://www.booking.com/searchresults.html?ss=${dest.hotels}&checkin=${checkin}&checkout=${checkout}&group_adults=${adults}&group_children=${children}&nflt=class%3D${stars}`
    : null;

  // Google Flights Suchlink
  const flightsUrl = dest
    ? `https://www.google.com/travel/flights?q=Flights+to+${dest.flights}+from+Zurich&d=${checkin}&r=${checkout}&px=${adults}`
    : null;

  // Skyscanner
  const skyscannerUrl = dest
    ? `https://www.skyscanner.ch/transport/fluge/zrh/?adultsv2=${adults}&childv2=${children}&departure=${checkin}&return=${checkout}&q=${dest.flights}`
    : null;

  // GetYourGuide Aktivitäten
  const gygUrl = dest
    ? `https://www.getyourguide.com/s/?q=${dest.city}&date_from=${checkin}&date_to=${checkout}&adults=${adults}`
    : null;

  // Viator
  const viatorUrl = dest
    ? `https://www.viator.com/searchResults/all?text=${dest.city}`
    : null;

  // Google Maps
  const mapsUrl = dest
    ? `https://www.google.com/maps/search/${dest.city}+${dest.country}`
    : null;

  // Zusammenfassung zum Kopieren
  const summary = `Kunde: ${anfrage.kontakt.vorname} ${anfrage.kontakt.nachname}
Destination: ${destName}
Reisende: ${adults} Erwachsene${children > 0 ? `, ${children} Kinder` : ""}
Zeitraum: ${checkin} bis ${checkout} (${anfrage.reisende.dauerTage} Tage)
Komfort: ${anfrage.stil.komfortLevel}
Budget/Person: ${anfrage.stil.budgetProPerson ? `CHF ${anfrage.stil.budgetProPerson.toLocaleString("de-CH")}` : "nicht angegeben"}
Reiseart: ${anfrage.destination.reiseart.join(", ")}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs uppercase tracking-wider text-gray-500">
          Buchungshilfe
        </h3>
        <CopyButton text={summary} label="Anfrage kopieren" />
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-700">Flüge suchen</p>
        {flightsUrl && (
          <LinkButton
            href={flightsUrl}
            icon={Plane}
            label="Google Flights"
            sublabel={`ZRH → ${dest?.flights} · ${adults} Erw.${children > 0 ? ` + ${children} Ki.` : ""}`}
          />
        )}
        {skyscannerUrl && (
          <LinkButton
            href={skyscannerUrl}
            icon={Plane}
            label="Skyscanner"
            sublabel={`Flüge vergleichen · ${checkin}`}
          />
        )}
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-700">Hotels suchen</p>
        {bookingUrl && (
          <LinkButton
            href={bookingUrl}
            icon={Hotel}
            label="Booking.com"
            sublabel={`${dest?.hotels} · ${stars}★ · ${checkin}`}
          />
        )}
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-700">
          Aktivitäten & Touren
        </p>
        {gygUrl && (
          <LinkButton
            href={gygUrl}
            icon={Compass}
            label="GetYourGuide"
            sublabel={`Touren in ${dest?.city}`}
          />
        )}
        {viatorUrl && (
          <LinkButton
            href={viatorUrl}
            icon={Compass}
            label="Viator"
            sublabel={`Erlebnisse in ${dest?.city}`}
          />
        )}
      </div>

      {mapsUrl && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-700">Karte</p>
          <LinkButton
            href={mapsUrl}
            icon={Map}
            label="Google Maps"
            sublabel={`${dest?.city}, ${dest?.country}`}
          />
        </div>
      )}

      {/* Kalkulationshilfe */}
      {anfrage.stil.budgetProPerson && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-medium text-amber-800">
            Kalkulationshilfe
          </p>
          <div className="mt-2 space-y-1 text-xs text-amber-700">
            <div className="flex justify-between">
              <span>Budget Kunde (pro Person)</span>
              <span className="font-medium">
                CHF{" "}
                {anfrage.stil.budgetProPerson.toLocaleString("de-CH")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>
                Gesamtbudget ({adults + children} Pers.)
              </span>
              <span className="font-medium">
                CHF{" "}
                {(
                  anfrage.stil.budgetProPerson * adults +
                  anfrage.stil.budgetProPerson * children * 0.7
                ).toLocaleString("de-CH")}
              </span>
            </div>
            <div className="border-t border-amber-200 pt-1">
              <div className="flex justify-between">
                <span>Empf. Einkaufsziel (80%)</span>
                <span className="font-medium">
                  CHF{" "}
                  {(anfrage.stil.budgetProPerson * 0.8).toLocaleString(
                    "de-CH"
                  )}
                  /Pers.
                </span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Marge (~20%)</span>
                <span className="font-medium">
                  CHF{" "}
                  {(anfrage.stil.budgetProPerson * 0.2).toLocaleString(
                    "de-CH"
                  )}
                  /Pers.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
