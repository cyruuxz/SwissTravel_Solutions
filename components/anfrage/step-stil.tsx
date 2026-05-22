"use client";

import { useFormContext } from "react-hook-form";
import type { AnfrageFormData } from "@/lib/schemas";
import { praeferenzen } from "@/lib/schemas";

const komfortOptions = [
  {
    value: "komfort" as const,
    label: "Komfort",
    beschreibung: "Ausgewählte Hotels und Unterkünfte mit gutem Standard",
  },
  {
    value: "premium" as const,
    label: "Premium",
    beschreibung: "Gehobene Hotels, besondere Erlebnisse, persönlicher Service",
  },
  {
    value: "luxus" as const,
    label: "Luxus",
    beschreibung: "Die besten Adressen, exklusive Zugänge, höchster Komfort",
  },
];

export function StepStil() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<AnfrageFormData>();

  const komfortLevel = watch("stil.komfortLevel");
  const budget = watch("stil.budgetProPerson");
  const selectedWichtig = watch("stil.wichtig") || [];

  const toggleWichtig = (pref: string) => {
    const current = [...selectedWichtig];
    const index = current.indexOf(pref as (typeof praeferenzen)[number]);
    if (index >= 0) {
      current.splice(index, 1);
    } else {
      current.push(pref as (typeof praeferenzen)[number]);
    }
    setValue("stil.wichtig", current);
  };

  const formatBudget = (val: number) => {
    if (val >= 30000) return "über CHF 30\u2019000";
    return `CHF ${val.toLocaleString("de-CH")}`;
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-serif text-2xl lg:text-3xl">Stil und Budget</h2>
        <p className="mt-2 text-muted-foreground">
          Wie stellen Sie sich Ihre Reise vor? Diese Angaben helfen uns, das
          richtige Angebot zu erstellen.
        </p>
      </div>

      {/* Komfort-Level */}
      <div>
        <label className="block text-sm text-muted-foreground">
          Komfort-Level
        </label>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {komfortOptions.map((opt) => {
            const isSelected = komfortLevel === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setValue("stil.komfortLevel", opt.value)}
                className={`border p-5 text-left transition-colors ${
                  isSelected
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-foreground/30"
                }`}
              >
                <span className="block text-sm font-medium">{opt.label}</span>
                <span className="mt-1 block text-xs text-muted-foreground leading-relaxed">
                  {opt.beschreibung}
                </span>
              </button>
            );
          })}
        </div>
        {errors.stil?.komfortLevel && (
          <p className="mt-2 text-sm text-destructive">
            {errors.stil.komfortLevel.message}
          </p>
        )}
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm text-muted-foreground">
          Budget pro Person:{" "}
          {budget ? formatBudget(budget) : "keine Angabe"}
        </label>
        <input
          type="range"
          min={1000}
          max={31000}
          step={500}
          value={budget || 10000}
          onChange={(e) =>
            setValue("stil.budgetProPerson", Number(e.target.value))
          }
          className="mt-3 w-full accent-accent"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>CHF 1&apos;000</span>
          <span>über CHF 30&apos;000</span>
        </div>
      </div>

      {/* Was ist wichtig */}
      <div>
        <label className="block text-sm text-muted-foreground">
          Was ist Ihnen wichtig?
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {praeferenzen.map((pref) => {
            const isSelected = selectedWichtig.includes(pref);
            return (
              <button
                key={pref}
                type="button"
                onClick={() => toggleWichtig(pref)}
                className={`inline-flex items-center px-4 py-2.5 text-sm border transition-colors ${
                  isSelected
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {pref}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
