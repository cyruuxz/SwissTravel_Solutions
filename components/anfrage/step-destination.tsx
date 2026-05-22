"use client";

import { useFormContext } from "react-hook-form";
import type { AnfrageFormData } from "@/lib/schemas";
import {
  reisearten as reiseartenOptions,
  regionen as regionenOptions,
} from "@/lib/schemas";

export function StepDestination() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<AnfrageFormData>();

  const ueberraschen = watch("destination.ueberraschen");
  const selectedRegionen = watch("destination.regionen") || [];
  const selectedReisearten = watch("destination.reiseart") || [];

  const toggleRegion = (region: string) => {
    const current = [...selectedRegionen];
    const index = current.indexOf(region as (typeof regionenOptions)[number]);
    if (index >= 0) {
      current.splice(index, 1);
    } else {
      current.push(region as (typeof regionenOptions)[number]);
    }
    setValue("destination.regionen", current);
  };

  const toggleReiseart = (art: string) => {
    const current = [...selectedReisearten];
    const index = current.indexOf(art as (typeof reiseartenOptions)[number]);
    if (index >= 0) {
      current.splice(index, 1);
    } else {
      current.push(art as (typeof reiseartenOptions)[number]);
    }
    setValue("destination.reiseart", current);
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-serif text-2xl lg:text-3xl">
          Wohin und welche Art Reise?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Haben Sie schon ein Ziel im Kopf? Oder dürfen wir Sie überraschen?
        </p>
      </div>

      {/* Destination oder überraschen */}
      <div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="ueberraschen"
            className="h-5 w-5 border border-border accent-accent"
            {...register("destination.ueberraschen")}
          />
          <label htmlFor="ueberraschen" className="text-sm">
            Überraschen Sie mich
          </label>
        </div>

        {!ueberraschen && (
          <div className="mt-6">
            <label
              htmlFor="destination"
              className="block text-sm text-muted-foreground"
            >
              Wunschdestination
            </label>
            <input
              type="text"
              id="destination"
              placeholder="z. B. Marokko, Japan, Island …"
              className="mt-2 h-14 w-full border border-border bg-transparent px-4 focus:border-accent focus:outline-none"
              {...register("destination.destination")}
            />
          </div>
        )}

        {ueberraschen && (
          <div className="mt-6">
            <label className="block text-sm text-muted-foreground">
              Welche Regionen interessieren Sie?
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              {regionenOptions.map((region) => {
                const isSelected = selectedRegionen.includes(region);
                return (
                  <button
                    key={region}
                    type="button"
                    onClick={() => toggleRegion(region)}
                    className={`inline-flex items-center px-4 py-2.5 text-sm border transition-colors ${
                      isSelected
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {region}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Reiseart */}
      <div>
        <label className="block text-sm text-muted-foreground">
          Art der Reise (mindestens eine)
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {reiseartenOptions.map((art) => {
            const isSelected = selectedReisearten.includes(art);
            return (
              <button
                key={art}
                type="button"
                onClick={() => toggleReiseart(art)}
                className={`inline-flex items-center px-4 py-2.5 text-sm border transition-colors ${
                  isSelected
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {art}
              </button>
            );
          })}
        </div>
        {errors.destination?.reiseart && (
          <p className="mt-2 text-sm text-destructive">
            {errors.destination.reiseart.message}
          </p>
        )}
      </div>
    </div>
  );
}
