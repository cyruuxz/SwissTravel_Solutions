import { Suspense } from "react";
import { MultiStepForm } from "@/components/anfrage/multi-step-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reise anfragen",
  description:
    "Stellen Sie Ihre persönliche Reiseanfrage. Wir melden uns innerhalb von 24 Stunden.",
};

export default function AnfragePage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Reiseanfrage
        </p>
        <h1 className="mt-4 font-serif text-3xl lg:text-4xl">
          Erzählen Sie uns von Ihrer Traumreise.
        </h1>
        <p className="mt-3 text-muted-foreground">
          Nehmen Sie sich einen Moment Zeit. Je mehr wir über Ihre Wünsche
          wissen, desto besser können wir Ihre Reise gestalten.
        </p>

        {/* TODO: KI-Chat-Bot Einstiegspunkt */}

        <div className="mt-12">
          <Suspense>
            <MultiStepForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
