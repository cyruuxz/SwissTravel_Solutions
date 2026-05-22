"use client";

import { useEffect, useState } from "react";
import { Inbox, Loader2 } from "lucide-react";
import AnfrageTable from "@/components/admin/anfrage-table";

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

export default function AdminDashboard() {
  const [anfragen, setAnfragen] = useState<Anfrage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/anfragen")
      .then((res) => res.json())
      .then((data) => {
        // Neueste zuerst
        const sorted = data.sort(
          (a: Anfrage, b: Anfrage) =>
            new Date(b.metadaten.eingegangenAm).getTime() -
            new Date(a.metadaten.eingegangenAm).getTime()
        );
        setAnfragen(sorted);
      })
      .catch(() => setAnfragen([]))
      .finally(() => setLoading(false));
  }, []);

  const counts = {
    total: anfragen.length,
    neu: anfragen.filter((a) => a.metadaten.status === "neu").length,
    inBearbeitung: anfragen.filter(
      (a) => a.metadaten.status === "in-bearbeitung"
    ).length,
    gesendet: anfragen.filter(
      (a) => a.metadaten.status === "angebot-gesendet"
    ).length,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl tracking-tight">Anfragen</h1>
        <p className="mt-1 text-sm text-gray-500">
          Übersicht aller eingegangenen Reiseanfragen
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-4">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Gesamt
          </p>
          <p className="mt-1 text-2xl font-medium text-gray-900">
            {counts.total}
          </p>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-xs uppercase tracking-wider text-amber-600">
            Neu
          </p>
          <p className="mt-1 text-2xl font-medium text-amber-700">
            {counts.neu}
          </p>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-4">
          <p className="text-xs uppercase tracking-wider text-blue-600">
            In Bearbeitung
          </p>
          <p className="mt-1 text-2xl font-medium text-blue-700">
            {counts.inBearbeitung}
          </p>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4">
          <p className="text-xs uppercase tracking-wider text-emerald-600">
            Angebot gesendet
          </p>
          <p className="mt-1 text-2xl font-medium text-emerald-700">
            {counts.gesendet}
          </p>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white py-16">
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        </div>
      ) : anfragen.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-16">
          <Inbox className="mb-3 h-8 w-8 text-gray-300" />
          <p className="text-sm text-gray-500">
            Noch keine Anfragen eingegangen.
          </p>
        </div>
      ) : (
        <AnfrageTable anfragen={anfragen} />
      )}
    </div>
  );
}
