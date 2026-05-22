"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import {
  anfrageSchema,
  stepReisendeSchema,
  stepDestinationSchema,
  stepStilSchema,
  stepKontaktSchema,
  type AnfrageFormData,
} from "@/lib/schemas";
import { StepReisende } from "./step-reisende";
import { StepDestination } from "./step-destination";
import { StepStil } from "./step-stil";
import { StepKontakt } from "./step-kontakt";

const steps = [
  { label: "Reisende", schema: stepReisendeSchema, key: "reisende" as const },
  {
    label: "Destination",
    schema: stepDestinationSchema,
    key: "destination" as const,
  },
  { label: "Stil & Budget", schema: stepStilSchema, key: "stil" as const },
  { label: "Kontakt", schema: stepKontaktSchema, key: "kontakt" as const },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const methods = useForm<AnfrageFormData>({
    resolver: zodResolver(anfrageSchema),
    defaultValues: {
      reisende: {
        erwachsene: 2,
        kinder: 0,
        kinderAlter: [],
        reisedatumVon: "",
        reisedatumBis: "",
        flexibel: false,
        dauerTage: 14,
      },
      destination: {
        destination: searchParams.get("reise")?.replace(/-/g, " ") || "",
        ueberraschen: false,
        regionen: [],
        reiseart: [],
      },
      stil: {
        komfortLevel: undefined as unknown as "komfort" | "premium" | "luxus",
        budgetProPerson: undefined,
        wichtig: [],
      },
      kontakt: {
        vorname: "",
        nachname: "",
        email: "",
        telefon: "",
        kontaktweg: undefined as unknown as "email" | "telefon" | "termin",
        kontaktzeit: undefined,
        nachricht: "",
        datenschutz: false as unknown as true,
      },
    },
    mode: "onTouched",
  });

  const goNext = async () => {
    const stepConfig = steps[currentStep];
    const values = methods.getValues(stepConfig.key);
    const result = stepConfig.schema.safeParse(values);

    if (!result.success) {
      // Trigger validation to show errors
      await methods.trigger(
        Object.keys(result.error.flatten().fieldErrors).map(
          (field) => `${stepConfig.key}.${field}` as keyof AnfrageFormData
        )
      );
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const goBack = () => {
    if (showSummary) {
      setShowSummary(false);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: AnfrageFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Anfrage fehlgeschlagen");
      router.push("/anfrage/danke");
    } catch {
      alert(
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formValues = methods.watch();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Progress */}
        {!showSummary && (
          <div className="mb-12">
            <p className="text-sm text-muted-foreground">
              Schritt {currentStep + 1} von {steps.length} –{" "}
              {steps[currentStep].label}
            </p>
            <div className="mt-3 flex gap-1.5">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 transition-colors ${
                    i <= currentStep ? "bg-accent" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Steps */}
        {!showSummary && (
          <>
            {currentStep === 0 && <StepReisende />}
            {currentStep === 1 && <StepDestination />}
            {currentStep === 2 && <StepStil />}
            {currentStep === 3 && <StepKontakt />}
          </>
        )}

        {/* Summary */}
        {showSummary && (
          <div className="space-y-10">
            <div>
              <h2 className="font-serif text-2xl lg:text-3xl">
                Zusammenfassung Ihrer Anfrage
              </h2>
              <p className="mt-2 text-muted-foreground">
                Bitte überprüfen Sie Ihre Angaben, bevor Sie die Anfrage senden.
              </p>
            </div>

            <div className="space-y-8">
              {/* Reisende */}
              <div className="border border-border p-6">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground">
                  Reisende & Zeitraum
                </h3>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Erwachsene</dt>
                    <dd>{formValues.reisende.erwachsene}</dd>
                  </div>
                  {formValues.reisende.kinder > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Kinder</dt>
                      <dd>
                        {formValues.reisende.kinder} (Alter:{" "}
                        {formValues.reisende.kinderAlter?.join(", ")})
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Reisezeitraum</dt>
                    <dd>
                      {formValues.reisende.reisedatumVon} –{" "}
                      {formValues.reisende.reisedatumBis}
                      {formValues.reisende.flexibel && " (flexibel)"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Reisedauer</dt>
                    <dd>{formValues.reisende.dauerTage} Tage</dd>
                  </div>
                </dl>
              </div>

              {/* Destination */}
              <div className="border border-border p-6">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground">
                  Destination
                </h3>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Wunschziel</dt>
                    <dd>
                      {formValues.destination.ueberraschen
                        ? "Überraschen Sie mich"
                        : formValues.destination.destination || "–"}
                    </dd>
                  </div>
                  {formValues.destination.regionen &&
                    formValues.destination.regionen.length > 0 && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Regionen</dt>
                        <dd>{formValues.destination.regionen.join(", ")}</dd>
                      </div>
                    )}
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Reiseart</dt>
                    <dd>{formValues.destination.reiseart.join(", ")}</dd>
                  </div>
                </dl>
              </div>

              {/* Stil */}
              <div className="border border-border p-6">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground">
                  Stil & Budget
                </h3>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Komfort-Level</dt>
                    <dd className="capitalize">
                      {formValues.stil.komfortLevel}
                    </dd>
                  </div>
                  {formValues.stil.budgetProPerson && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Budget / Person</dt>
                      <dd>
                        {formValues.stil.budgetProPerson >= 30000
                          ? "über CHF 30\u2019000"
                          : `CHF ${formValues.stil.budgetProPerson.toLocaleString("de-CH")}`}
                      </dd>
                    </div>
                  )}
                  {formValues.stil.wichtig.length > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Wichtig</dt>
                      <dd className="text-right">
                        {formValues.stil.wichtig.join(", ")}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Kontakt */}
              <div className="border border-border p-6">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground">
                  Kontakt
                </h3>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Name</dt>
                    <dd>
                      {formValues.kontakt.vorname} {formValues.kontakt.nachname}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">E-Mail</dt>
                    <dd>{formValues.kontakt.email}</dd>
                  </div>
                  {formValues.kontakt.telefon && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Telefon</dt>
                      <dd>{formValues.kontakt.telefon}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Kontaktweg</dt>
                    <dd className="capitalize">
                      {formValues.kontakt.kontaktweg}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          {(currentStep > 0 || showSummary) && (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück
            </button>
          )}
          <div className="ml-auto">
            {!showSummary ? (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-2 bg-accent px-7 py-3.5 text-sm tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
              >
                {currentStep < steps.length - 1 ? "Weiter" : "Zusammenfassung"}
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-accent px-7 py-3.5 text-sm tracking-wide text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? "Wird gesendet …" : "Anfrage senden"}
                <Send className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
