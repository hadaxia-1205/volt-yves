import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout-flow";
import { DemoBanner } from "@/components/demo-banner";

export const metadata: Metadata = {
  title: "Commande de démonstration",
  description:
    "Parcours de commande fictif. Aucun paiement et aucune commande réelle.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-4xl sm:text-5xl">Commande</h1>
      <div className="mt-5">
        <DemoBanner />
      </div>
      <CheckoutFlow />
    </div>
  );
}
