"use client";

import Link from "next/link";
import { shop } from "@/config/shop";
import { getProduct, productCountLabel } from "@/data/products";
import { Price } from "@/components/price";
import { QuantityInput } from "@/components/quantity-input";
import { useCartActions, useCartLines, useHydrated } from "@/components/cart-provider";
import { formatPrice, vatPortion } from "@/lib/money";

export function CartView() {
  const hydrated = useHydrated();
  const lines = useCartLines();
  const { setCartQty, removeFromCart } = useCartActions();

  if (!hydrated) {
    return <p className="mt-6 text-muted">Chargement du panier…</p>;
  }

  const rows = lines.flatMap((line) => {
    const product = getProduct(line.slug);
    return product ? [{ line, product }] : [];
  });

  if (rows.length === 0) {
    return (
      <div className="mt-8 border border-line bg-surface p-6">
        <p>Votre panier est vide.</p>
        <Link href="/catalogue" className="btn btn-primary mt-5">
          Revenir au catalogue
        </Link>
      </div>
    );
  }

  const total = rows.reduce((sum, row) => sum + row.product.price * row.line.qty, 0);
  const count = rows.reduce((sum, row) => sum + row.line.qty, 0);

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <ul className="divide-y divide-line border border-line bg-surface">
        {rows.map(({ line, product }) => (
          <li key={line.slug} className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div className="min-w-0">
              <h2 className="font-display text-xl">
                <Link href={`/produit/${product.slug}`} className="underline-offset-4 hover:underline">
                  {product.name}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-muted">{product.highlights[0]}</p>
              <p className="mt-2 tabular-nums">
                <Price value={product.price} />
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <QuantityInput
                value={line.qty}
                label={`Quantité pour ${product.name}`}
                onChange={(qty) => setCartQty(product.slug, qty)}
              />
              <p className="min-w-28 text-right tabular-nums">
                {formatPrice(product.price * line.qty)}
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                aria-label={`Retirer ${product.name}`}
                onClick={() => removeFromCart(product.slug)}
              >
                Retirer
              </button>
            </div>
          </li>
        ))}
      </ul>
      <aside className="h-fit border border-line bg-surface p-4" aria-label="Total du panier">
        <h2 className="font-display text-xl">Total</h2>
        <p className="mt-3 text-sm text-muted">{productCountLabel(count)}</p>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt>Sous-total</dt>
            <dd className="tabular-nums">{formatPrice(total)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>{shop.vatLabel}</dt>
            <dd className="tabular-nums">{formatPrice(vatPortion(total))}</dd>
          </div>
          <div className="flex justify-between gap-3 border-t border-line pt-2 text-base">
            <dt>Total</dt>
            <dd className="tabular-nums">
              <Price value={total} />
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-sm text-muted">Livraison non facturée dans cette démonstration.</p>
        <Link href="/commande" className="btn btn-primary mt-5 w-full">
          Continuer la démonstration
        </Link>
      </aside>
    </div>
  );
}
