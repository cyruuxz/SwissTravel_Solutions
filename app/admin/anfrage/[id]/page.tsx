"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Star,
  Wallet,
  MessageSquare,
  Mail,
  Phone,
  Clock,
  Loader2,
} from "lucide-react";
import AngebotEditor from "@/components/admin/angebot-editor";
import BuchungsLinks from "@/components/admin/buchungs-links";

type Anfrage = {
  id: string;
  reisende: {
    erwachsene: number;
    kinder: number;
    kinderAlter?: number[];
    reisedatumVon: string;
    reisedatumBis: string;
    flexibel: boolean;
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
    wichtig: string[];
  };
  kontakt: {
    vorname: string;
    nachname: string;
    email: string;
    telefon?: string;
    kontaktweg?: string;
    kontaktzeit?: string;
    nachricht?: string;
  };
  metadaten: {
    eingegangenAm: string;
    status: string;
  };
  angebot?: string;
};

const statusLabels: Record<string, string> = {
  neu: "Neu",
  "in-bearbeitung": "In Bearbeitung",
  "angebot-gesendet": "Angebot gesendet",
  beantwortet: "Beantwortet",
};

const statusColors: Record<string, string> = {
  neu: "bg-amber-50 text-amber-700 border-amber-200",
  "in-bearbeitung": "bg-blue-50 text-blue-700 border-blue-200",
  "angebot-gesendet": "bg-emerald-50 text-emerald-700 border-emerald-200",
  beantwortet: "bg-gray-100 text-gray-600 border-gray-200",
};

const komfortLabels: Record<string, string> = {
  standard: "Standard",
  komfort: "Komfort",
  premium: "Premium",
  luxus: "Luxus",
};

function formatDate(dateString: string): string {
  if (!dateString) return "–";
  const date = new Date(dateString);
  return date.toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 py-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          {label}
        </p>
        <div className="mt-0.5 text-sm text-gray-900">{children}</div>
      </div>
    </div>
  );
}

export default function AnfrageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [anfrage, setAnfrage] = useState<Anfrage | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!params.id) return;

    fetch(`/api/admin/anfragen/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setAnfrage(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
      </div>
    );
  }

  if (notFound || !anfrage) {
    return (
      <div className="py-24 text-center">
        <p className="text-sm text-gray-500">Anfrage nicht gefunden.</p>
        <button
          onClick={() => router.push("/admin")}
          className="mt-4 text-sm text-[#2C4A52] hover:underline"
        >
          Zurück zur Übersicht
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-serif text-xl tracking-tight">
              {anfrage.kontakt.vorname} {anfrage.kontakt.nachname}
            </h1>
            <p className="text-sm text-gray-500">
              Anfrage vom{" "}
              {formatDate(anfrage.metadaten.eingegangenAm)}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
            statusColors[anfrage.metadaten.status] || statusColors.neu
          }`}
        >
          {statusLabels[anfrage.metadaten.status] ||
            anfrage.metadaten.status}
        </span>
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-5 gap-6">
        {/* Left: Customer Info (2 cols) */}
        <div className="col-span-2 space-y-5">
          {/* Kontaktdaten */}
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h3 className="mb-1 text-xs uppercase tracking-wider text-gray-500">
              Kontaktdaten
            </h3>

            <div className="divide-y divide-gray-100">
              <InfoRow icon={Mail} label="E-Mail">
                <a
                  href={`mailto:${anfrage.kontakt.email}`}
                  className="text-[#2C4A52] hover:underline"
                >
                  {anfrage.kontakt.email}
                </a>
              </InfoRow>

              {anfrage.kontakt.telefon && (
                <InfoRow icon={Phone} label="Telefon">
                  {anfrage.kontakt.telefon}
                </InfoRow>
              )}

              {anfrage.kontakt.kontaktweg && (
                <InfoRow icon={MessageSquare} label="Bevorzugter Kontaktweg">
                  {anfrage.kontakt.kontaktweg === "email"
                    ? "E-Mail"
                    : anfrage.kontakt.kontaktweg === "telefon"
                      ? "Telefon"
                      : anfrage.kontakt.kontaktweg}
                </InfoRow>
              )}

              {anfrage.kontakt.kontaktzeit && (
                <InfoRow icon={Clock} label="Erreichbarkeit">
                  {anfrage.kontakt.kontaktzeit === "egal"
                    ? "Jederzeit"
                    : anfrage.kontakt.kontaktzeit}
                </InfoRow>
              )}
            </div>
          </div>

          {/* Reisewünsche */}
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h3 className="mb-1 text-xs uppercase tracking-wider text-gray-500">
              Reisewünsche
            </h3>

            <div className="divide-y divide-gray-100">
              <InfoRow icon={MapPin} label="Destination">
                {anfrage.destination.ueberraschen ? (
                  <span>
                    Überraschung
                    {anfrage.destination.regionen &&
                      anfrage.destination.regionen.length > 0 && (
                        <span className="text-gray-500">
                          {" "}
                          (Regionen: {anfrage.destination.regionen.join(", ")})
                        </span>
                      )}
                  </span>
                ) : (
                  anfrage.destination.destination || "–"
                )}
              </InfoRow>

              <InfoRow icon={Calendar} label="Reisezeitraum">
                <span>
                  {formatDate(anfrage.reisende.reisedatumVon)} –{" "}
                  {formatDate(anfrage.reisende.reisedatumBis)}
                </span>
                {anfrage.reisende.flexibel && (
                  <span className="ml-2 rounded bg-blue-50 px-1.5 py-0.5 text-xs text-blue-600">
                    ± 1 Woche flexibel
                  </span>
                )}
                <p className="mt-0.5 text-xs text-gray-500">
                  {anfrage.reisende.dauerTage} Tage
                </p>
              </InfoRow>

              <InfoRow icon={Users} label="Reisende">
                <span>
                  {anfrage.reisende.erwachsene} Erwachsene
                  {anfrage.reisende.kinder > 0 && (
                    <>
                      , {anfrage.reisende.kinder} Kinder
                      {anfrage.reisende.kinderAlter &&
                        anfrage.reisende.kinderAlter.length > 0 && (
                          <span className="text-gray-500">
                            {" "}
                            (Alter: {anfrage.reisende.kinderAlter.join(", ")})
                          </span>
                        )}
                    </>
                  )}
                </span>
              </InfoRow>

              <div className="py-3">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Reiseart
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {anfrage.destination.reiseart.map((art) => (
                    <span
                      key={art}
                      className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-700"
                    >
                      {art}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stil & Budget */}
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h3 className="mb-1 text-xs uppercase tracking-wider text-gray-500">
              Stil & Budget
            </h3>

            <div className="divide-y divide-gray-100">
              <InfoRow icon={Star} label="Komfort-Level">
                {komfortLabels[anfrage.stil.komfortLevel] ||
                  anfrage.stil.komfortLevel}
              </InfoRow>

              <InfoRow icon={Wallet} label="Budget pro Person">
                {anfrage.stil.budgetProPerson
                  ? `CHF ${anfrage.stil.budgetProPerson.toLocaleString("de-CH")}`
                  : "Nicht angegeben"}
              </InfoRow>

              {anfrage.stil.wichtig.length > 0 && (
                <div className="py-3">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Besonders wichtig
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {anfrage.stil.wichtig.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#2C4A52]/20 bg-[#2C4A52]/5 px-2.5 py-1 text-xs text-[#2C4A52]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Persönliche Nachricht */}
          {anfrage.kontakt.nachricht && (
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h3 className="mb-2 text-xs uppercase tracking-wider text-gray-500">
                Persönliche Nachricht
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                {anfrage.kontakt.nachricht}
              </p>
            </div>
          )}

          {/* Buchungshilfe */}
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <BuchungsLinks anfrage={anfrage} />
          </div>
        </div>

        {/* Right: Angebot Editor (3 cols) */}
        <div className="col-span-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <AngebotEditor anfrage={anfrage} />
          </div>
        </div>
      </div>
    </div>
  );
}
