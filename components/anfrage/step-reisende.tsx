"use client";

import { useFormContext } from "react-hook-form";
import type { AnfrageFormData } from "@/lib/schemas";
import { Minus, Plus } from "lucide-react";

export function StepReisende() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<AnfrageFormData>();

  const erwachsene = watch("reisende.erwachsene");
  const kinder = watch("reisende.kinder");
  const dauerTage = watch("reisende.dauerTage");

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-serif text-2xl lg:text-3xl">
          Wer reist und wann?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Erzählen Sie uns, mit wem Sie reisen und wann es losgehen soll.
        </p>
      </div>

      {/* Anzahl Erwachsene */}
      <div>
        <label className="block text-sm text-muted-foreground">
          Anzahl Erwachsene
        </label>
        <div className="mt-2 flex items-center gap-4">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-border transition-colors hover:bg-muted"
            onClick={() =>
              setValue("reisende.erwachsene", Math.max(1, erwachsene - 1))
            }
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-lg">{erwachsene}</span>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-border transition-colors hover:bg-muted"
            onClick={() =>
              setValue("reisende.erwachsene", Math.min(10, erwachsene + 1))
            }
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {errors.reisende?.erwachsene && (
          <p className="mt-1.5 text-sm text-destructive">
            {errors.reisende.erwachsene.message}
          </p>
        )}
      </div>

      {/* Anzahl Kinder */}
      <div>
        <label className="block text-sm text-muted-foreground">
          Anzahl Kinder
        </label>
        <div className="mt-2 flex items-center gap-4">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-border transition-colors hover:bg-muted"
            onClick={() => {
              const next = Math.max(0, kinder - 1);
              setValue("reisende.kinder", next);
              const current = watch("reisende.kinderAlter") || [];
              setValue("reisende.kinderAlter", current.slice(0, next));
            }}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-lg">{kinder}</span>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-border transition-colors hover:bg-muted"
            onClick={() => {
              const next = Math.min(10, kinder + 1);
              setValue("reisende.kinder", next);
              const current = watch("reisende.kinderAlter") || [];
              setValue("reisende.kinderAlter", [...current, 5]);
            }}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Alter der Kinder (conditional) */}
      {kinder > 0 && (
        <div>
          <label className="block text-sm text-muted-foreground">
            Alter der Kinder
          </label>
          <div className="mt-2 flex flex-wrap gap-3">
            {Array.from({ length: kinder }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Kind {i + 1}:
                </span>
                <input
                  type="number"
                  min={0}
                  max={17}
                  className="h-12 w-20 border border-border bg-transparent px-3 text-center focus:border-accent focus:outline-none"
                  {...register(`reisende.kinderAlter.${i}`, {
                    valueAsNumber: true,
                  })}
                />
                <span className="text-sm text-muted-foreground">Jahre</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reisedatum */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="reisedatumVon"
            className="block text-sm text-muted-foreground"
          >
            Reisedatum von
          </label>
          <input
            type="date"
            id="reisedatumVon"
            className="mt-2 h-14 w-full border border-border bg-transparent px-4 focus:border-accent focus:outline-none"
            {...register("reisende.reisedatumVon")}
          />
          {errors.reisende?.reisedatumVon && (
            <p className="mt-1.5 text-sm text-destructive">
              {errors.reisende.reisedatumVon.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="reisedatumBis"
            className="block text-sm text-muted-foreground"
          >
            Reisedatum bis
          </label>
          <input
            type="date"
            id="reisedatumBis"
            className="mt-2 h-14 w-full border border-border bg-transparent px-4 focus:border-accent focus:outline-none"
            {...register("reisende.reisedatumBis")}
          />
          {errors.reisende?.reisedatumBis && (
            <p className="mt-1.5 text-sm text-destructive">
              {errors.reisende.reisedatumBis.message}
            </p>
          )}
        </div>
      </div>

      {/* Flexibel */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="flexibel"
          className="h-5 w-5 border border-border accent-accent"
          {...register("reisende.flexibel")}
        />
        <label htmlFor="flexibel" className="text-sm">
          ± 1 Woche flexibel
        </label>
      </div>

      {/* Reisedauer */}
      <div>
        <label className="block text-sm text-muted-foreground">
          Gewünschte Reisedauer: {dauerTage} Tage
        </label>
        <input
          type="range"
          min={1}
          max={30}
          className="mt-3 w-full accent-accent"
          {...register("reisende.dauerTage", { valueAsNumber: true })}
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>1 Tag</span>
          <span>30 Tage</span>
        </div>
      </div>
    </div>
  );
}
