import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Panier",
  description: "Panier VOLT CORE. Les quantités sont conservées dans ce navigateur.",
};

export default function CartPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-4xl sm:text-5xl">Panier</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Les quantités restent dans ce navigateur. Aucune commande n’est envoyée depuis cette page.
      </p>
      <CartView />
    </div>
  );
}
