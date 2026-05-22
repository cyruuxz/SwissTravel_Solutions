"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        sessionStorage.setItem("admin_token", "authenticated");
        router.push("/admin");
      } else {
        setError("Falsches Passwort.");
      }
    } catch {
      setError("Verbindungsfehler. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fa]">
      <div className="w-full max-w-sm">
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <Lock className="h-4 w-4 text-gray-600" />
            </div>
            <h1 className="font-serif text-xl">Admin-Bereich</h1>
            <p className="mt-1 text-sm text-gray-500">
              SwissTravel Solutions
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="password"
              className="block text-sm text-gray-600"
            >
              Passwort
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-sm focus:border-[#2C4A52] focus:outline-none"
              placeholder="Admin-Passwort eingeben"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="mt-4 h-11 w-full rounded-md bg-[#2C4A52] text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Prüfe …" : "Anmelden"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          <a href="/" className="hover:text-gray-600">
            Zurück zur Website
          </a>
        </p>
      </div>
    </div>
  );
}
