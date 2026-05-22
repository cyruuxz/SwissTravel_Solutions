"use client";

import { useState } from "react";
import {
  Sparkles,
  Send,
  Loader2,
  Check,
  AlertCircle,
  ExternalLink,
  Eye,
} from "lucide-react";

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
    nachricht?: string;
  };
  metadaten: {
    eingegangenAm: string;
    status: string;
  };
  angebot?: string;
};

export default function AngebotEditor({
  anfrage,
}: {
  anfrage: Anfrage;
}) {
  const [angebotText, setAngebotText] = useState(anfrage.angebot || "");
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(
    anfrage.metadaten.status === "angebot-gesendet"
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [resendOk, setResendOk] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(anfrage),
      });

      if (!res.ok) throw new Error("Fehler bei der Generierung");

      const data = await res.json();
      setAngebotText(data.angebot);

      // Angebot in der Anfrage speichern
      await fetch(`/api/admin/anfragen/${anfrage.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          angebot: data.angebot,
          status: "in-bearbeitung",
        }),
      });

      setSuccess("Angebot wurde generiert.");
    } catch {
      setError(
        "Angebot konnte nicht generiert werden. Prüfe den ANTHROPIC_API_KEY."
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleSend = async () => {
    if (!angebotText.trim()) {
      setError("Bitte zuerst ein Angebot erstellen.");
      return;
    }

    setSending(true);
    setError("");
    setSuccess("");
    setPreviewUrl("");
    setResendOk(false);

    try {
      const res = await fetch("/api/admin/send-angebot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          anfrageId: anfrage.id,
          angebotText,
          kundeEmail: anfrage.kontakt.email,
          vorname: anfrage.kontakt.vorname,
          nachname: anfrage.kontakt.nachname,
        }),
      });

      if (!res.ok) throw new Error("Fehler beim Versand");

      const data = await res.json();
      setSent(true);

      if (data.previewUrl) {
        setPreviewUrl(data.previewUrl);
      }
      if (data.resendOk) {
        setResendOk(true);
      }

      setSuccess(
        data.resendOk
          ? `E-Mail wurde an ${anfrage.kontakt.email} gesendet (prüfe Spam-Ordner).`
          : "E-Mail-Vorschau wurde erstellt."
      );
    } catch {
      setError("E-Mail konnte nicht gesendet werden.");
    } finally {
      setSending(false);
    }
  };

  const handleSave = async () => {
    setError("");
    try {
      await fetch(`/api/admin/anfragen/${anfrage.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ angebot: angebotText }),
      });
      setSuccess("Angebot gespeichert.");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Speichern fehlgeschlagen.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg">Reiseangebot</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center gap-2 rounded-md bg-[#2C4A52] px-4 py-2 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {generating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {generating ? "Generiere …" : "Angebot generieren"}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <Check className="h-4 w-4 shrink-0" />
          {success}
        </div>
      )}

      {/* E-Mail-Vorschau und Ergebnis */}
      {previewUrl && (
        <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
          <p className="mb-2 text-sm font-medium text-blue-900">
            E-Mail-Vorschau
          </p>
          <p className="mb-3 text-xs text-blue-700">
            {resendOk
              ? `Die E-Mail wurde an ${anfrage.kontakt.email} gesendet. Hier kannst du die formatierte Version ansehen:`
              : `Die Website ist noch nicht gehostet, daher kann Resend mit "onboarding@resend.dev" keine E-Mails zuverlässig zustellen. Sobald du eine eigene Domain verifizierst, funktioniert der Versand. Bis dahin kannst du die E-Mail hier ansehen und den Inhalt manuell per E-Mail senden:`}
          </p>
          <div className="flex gap-2">
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
            >
              <Eye className="h-4 w-4" />
              E-Mail im Browser ansehen
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}

      <textarea
        value={angebotText}
        onChange={(e) => setAngebotText(e.target.value)}
        placeholder="Klicke auf 'Angebot generieren' um ein KI-generiertes Reiseangebot zu erstellen, oder schreibe hier manuell ein Angebot …"
        className="h-[500px] w-full resize-y rounded-md border border-gray-200 bg-white p-4 font-mono text-sm leading-relaxed text-gray-800 placeholder:text-gray-400 focus:border-[#2C4A52] focus:outline-none"
      />

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <button
          onClick={handleSave}
          className="rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
        >
          Entwurf speichern
        </button>

        <button
          onClick={handleSend}
          disabled={sending || !angebotText.trim()}
          className="inline-flex items-center gap-2 rounded-md bg-[#B85C3D] px-5 py-2 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : sent ? (
            <Check className="h-4 w-4" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {sending
            ? "Sende …"
            : sent
              ? "Erneut senden"
              : "Per E-Mail senden"}
        </button>
      </div>

      <p className="text-xs text-gray-400">
        Empfänger: {anfrage.kontakt.email}
        {sent && " · Angebot wurde versendet"}
      </p>
    </div>
  );
}
