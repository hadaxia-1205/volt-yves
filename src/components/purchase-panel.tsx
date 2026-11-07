"use client";

import Link from "next/link";
import { useState } from "react";
import { availabilityLabel, shop } from "@/config/shop";
import { QuantityInput } from "@/components/quantity-input";
import { useCartActions } from "@/components/cart-provider";
import type { Product } from "@/data/products";

export function PurchasePanel({ product }: { product: Product }) {
  const { addToCart } = useCartActions();
  const [qty, setQty] = useState(1);
  const [notice, setNotice] = useState("");
  const unavailable = product.availability === "rupture";

  function add() {
    if (unavailable) return;
    addToCart(product.slug, qty);
    const plural = qty > 1 ? "exemplaires ont été ajoutés" : "exemplaire a été ajouté";
    setNotice(`${product.name} : ${qty} ${plural} au panier.`);
  }

  return (
    <div className="mt-6 space-y-4">
      <p>
        <span className="text-muted">Disponibilité : </span>
        {availabilityLabel(product.availability)}
        {product.availability === "sur-commande" ? " — délai d’atelier" : ""}
      </p>
      {unavailable ? (
        <p>Indisponible pour le moment. L’atelier ne peut pas l’ajouter au panier.</p>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <QuantityInput value={qty} onChange={setQty} />
          <button type="button" className="btn btn-primary" onClick={add}>
            Ajouter au panier
          </button>
        </div>
      )}
      <p className="text-sm text-muted">Quantité maximale : {shop.maxQuantity}.</p>
      {notice ? (
        <p role="status" className="volt-rise border border-line bg-bg px-3 py-3 text-sm">
          {notice}{" "}
          <Link href="/panier" className="underline">
            Voir le panier
          </Link>
        </p>
      ) : null}
    </div>
  );
}
