"use client";

import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  ChevronRight,
} from "lucide-react";

type Anfrage = {
  id: string;
  reisende: {
    erwachsene: number;
    kinder: number;
    dauerTage: number;
  };
  destination: {
    destination?: string;
    ueberraschen: boolean;
    reiseart: string[];
  };
  stil: {
    komfortLevel: string;
    budgetProPerson?: number;
  };
  kontakt: {
    vorname: string;
    nachname: string;
    email: string;
  };
  metadaten: {
    eingegangenAm: string;
    status: string;
  };
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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AnfrageTable({
  anfragen,
}: {
  anfragen: Anfrage[];
}) {
  if (anfragen.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
        <p className="text-sm text-gray-500">
          Noch keine Anfragen eingegangen.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Datum
            </th>
            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Kunde
            </th>
            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Destination
            </th>
            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Reiseart
            </th>
            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Reisende
            </th>
            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {anfragen.map((anfrage) => (
            <tr
              key={anfrage.id}
              className="transition-colors hover:bg-gray-50/50"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-3.5 w-3.5 text-gray-400" />
                  <div>
                    <span>{formatDate(anfrage.metadaten.eingegangenAm)}</span>
                    <span className="ml-1.5 text-xs text-gray-400">
                      {formatTime(anfrage.metadaten.eingegangenAm)}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {anfrage.kontakt.vorname} {anfrage.kontakt.nachname}
                  </p>
                  <p className="text-xs text-gray-500">
                    {anfrage.kontakt.email}
                  </p>
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-1.5 text-sm text-gray-700">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  {anfrage.destination.ueberraschen
                    ? "Überraschung"
                    : anfrage.destination.destination || "–"}
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="flex flex-wrap gap-1">
                  {anfrage.destination.reiseart.slice(0, 2).map((art) => (
                    <span
                      key={art}
                      className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                    >
                      {art}
                    </span>
                  ))}
                  {anfrage.destination.reiseart.length > 2 && (
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      +{anfrage.destination.reiseart.length - 2}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Users className="h-3.5 w-3.5 text-gray-400" />
                  {anfrage.reisende.erwachsene} Erw.
                  {anfrage.reisende.kinder > 0 &&
                    `, ${anfrage.reisende.kinder} Ki.`}
                </div>
              </td>
              <td className="px-5 py-4">
                <span
                  className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
                    statusColors[anfrage.metadaten.status] ||
                    statusColors.neu
                  }`}
                >
                  {statusLabels[anfrage.metadaten.status] ||
                    anfrage.metadaten.status}
                </span>
              </td>
              <td className="px-5 py-4 text-right">
                <Link
                  href={`/admin/anfrage/${anfrage.id}`}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-[#2C4A52] transition-colors hover:bg-[#2C4A52]/5"
                >
                  Öffnen
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
