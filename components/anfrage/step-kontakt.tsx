"use client";

import { useFormContext } from "react-hook-form";
import type { AnfrageFormData } from "@/lib/schemas";

const kontaktwegOptions = [
  { value: "email" as const, label: "E-Mail" },
  { value: "telefon" as const, label: "Telefon" },
  { value: "termin" as const, label: "Online-Termin" },
];

const kontaktzeitOptions = [
  { value: "vormittag" as const, label: "Vormittag" },
  { value: "nachmittag" as const, label: "Nachmittag" },
  { value: "abend" as const, label: "Abend" },
  { value: "egal" as const, label: "Egal" },
];

export function StepKontakt() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<AnfrageFormData>();

  const kontaktweg = watch("kontakt.kontaktweg");

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-serif text-2xl lg:text-3xl">
          Kontakt und Persönliches
        </h2>
        <p className="mt-2 text-muted-foreground">
          Wie können wir Sie erreichen? Wir melden uns innerhalb von 24 Stunden.
        </p>
      </div>

      {/* Name */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="vorname"
            className="block text-sm text-muted-foreground"
          >
            Vorname
          </label>
          <input
            type="text"
            id="vorname"
            className="mt-2 h-14 w-full border border-border bg-transparent px-4 focus:border-accent focus:outline-none"
            {...register("kontakt.vorname")}
          />
          {errors.kontakt?.vorname && (
            <p className="mt-1.5 text-sm text-destructive">
              {errors.kontakt.vorname.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="nachname"
            className="block text-sm text-muted-foreground"
          >
            Nachname
          </label>
          <input
            type="text"
            id="nachname"
            className="mt-2 h-14 w-full border border-border bg-transparent px-4 focus:border-accent focus:outline-none"
            {...register("kontakt.nachname")}
          />
          {errors.kontakt?.nachname && (
            <p className="mt-1.5 text-sm text-destructive">
              {errors.kontakt.nachname.message}
            </p>
          )}
        </div>
      </div>

      {/* E-Mail */}
      <div>
        <label htmlFor="email" className="block text-sm text-muted-foreground">
          E-Mail
        </label>
        <input
          type="email"
          id="email"
          className="mt-2 h-14 w-full border border-border bg-transparent px-4 focus:border-accent focus:outline-none"
          {...register("kontakt.email")}
        />
        {errors.kontakt?.email && (
          <p className="mt-1.5 text-sm text-destructive">
            {errors.kontakt.email.message}
          </p>
        )}
      </div>

      {/* Telefon */}
      <div>
        <label
          htmlFor="telefon"
          className="block text-sm text-muted-foreground"
        >
          Telefon (optional)
        </label>
        <input
          type="tel"
          id="telefon"
          className="mt-2 h-14 w-full border border-border bg-transparent px-4 focus:border-accent focus:outline-none"
          {...register("kontakt.telefon")}
        />
      </div>

      {/* Bevorzugter Kontaktweg */}
      <div>
        <label className="block text-sm text-muted-foreground">
          Bevorzugter Kontaktweg
        </label>
        <div className="mt-3 flex flex-wrap gap-3">
          {kontaktwegOptions.map((opt) => {
            const isSelected = kontaktweg === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setValue("kontakt.kontaktweg", opt.value)}
                className={`inline-flex items-center px-5 py-2.5 text-sm border transition-colors ${
                  isSelected
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {errors.kontakt?.kontaktweg && (
          <p className="mt-2 text-sm text-destructive">
            {errors.kontakt.kontaktweg.message}
          </p>
        )}
      </div>

      {/* Kontaktzeit */}
      <div>
        <label className="block text-sm text-muted-foreground">
          Wann dürfen wir Sie am liebsten kontaktieren? (optional)
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {kontaktzeitOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setValue("kontakt.kontaktzeit", opt.value)}
              className={`inline-flex items-center px-4 py-2.5 text-sm border transition-colors ${
                watch("kontakt.kontaktzeit") === opt.value
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Nachricht */}
      <div>
        <label
          htmlFor="nachricht"
          className="block text-sm text-muted-foreground"
        >
          Erzählen Sie uns mehr über Ihre Traumreise (optional, max. 500
          Zeichen)
        </label>
        <textarea
          id="nachricht"
          rows={4}
          maxLength={500}
          className="mt-2 w-full border border-border bg-transparent p-4 focus:border-accent focus:outline-none resize-none"
          {...register("kontakt.nachricht")}
        />
      </div>

      {/* Datenschutz */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="datenschutz"
          className="mt-1 h-5 w-5 border border-border accent-accent"
          {...register("kontakt.datenschutz")}
        />
        <label htmlFor="datenschutz" className="text-sm text-muted-foreground">
          Ich akzeptiere die{" "}
          <a href="/datenschutz" className="underline hover:text-foreground">
            Datenschutzerklärung
          </a>{" "}
          und bin damit einverstanden, dass SwissTravel Solutions meine Angaben
          zur Bearbeitung meiner Reiseanfrage verwendet.
        </label>
      </div>
      {errors.kontakt?.datenschutz && (
        <p className="text-sm text-destructive">
          {errors.kontakt.datenschutz.message}
        </p>
      )}
    </div>
  );
}
