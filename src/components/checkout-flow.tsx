"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { demo, demoSample, shop } from "@/config/shop";
import { getProduct } from "@/data/products";
import { Price } from "@/components/price";
import { useCartActions, useCartLines, useHydrated } from "@/components/cart-provider";
import { formatPrice, vatPortion } from "@/lib/money";

type FormState = {
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  npa: string;
  ville: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

type ReceiptLine = {
  slug: string;
  name: string;
  qty: number;
  price: number;
};

let demoSequence = 1000;

function nextDemoReference() {
  demoSequence += 1;
  return `VC-${demoSequence}`;
}

const emptyForm: FormState = {
  nom: "",
  email: "",
  telephone: "",
  adresse: "",
  npa: "",
  ville: "",
};

const fields: { name: keyof FormState; label: string; autoComplete: string; inputMode?: "email" | "tel" | "numeric" }[] = [
  { name: "nom", label: "Nom", autoComplete: "name" },
  { name: "email", label: "E-mail", autoComplete: "email", inputMode: "email" },
  { name: "telephone", label: "Téléphone", autoComplete: "tel", inputMode: "tel" },
  { name: "adresse", label: "Adresse", autoComplete: "street-address" },
  { name: "npa", label: "NPA", autoComplete: "postal-code", inputMode: "numeric" },
  { name: "ville", label: "Localité", autoComplete: "address-level2" },
];

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (form.nom.trim().length < 2) {
    errors.nom = "Indiquez un nom d’essai, deux caractères au minimum.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Indiquez un e-mail d’essai valide.";
  }
  if (form.telephone.replace(/\D/g, "").length < 8) {
    errors.telephone = "Indiquez un numéro d’essai d’au moins 8 chiffres.";
  }
  if (form.adresse.trim().length < 5) {
    errors.adresse = "Indiquez une adresse d’essai.";
  }
  if (!/^[1-9]\d{3}$/.test(form.npa.trim())) {
    errors.npa = "Le NPA suisse comporte 4 chiffres.";
  }
  if (form.ville.trim().length < 2) {
    errors.ville = "Indiquez une localité.";
  }
  return errors;
}

export function CheckoutFlow() {
  const hydrated = useHydrated();
  const lines = useCartLines();
  const { clearCart } = useCartActions();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [receipt, setReceipt] = useState<{ reference: string; lines: ReceiptLine[] } | null>(null);

  const rows = lines.flatMap((line) => {
    const product = getProduct(line.slug);
    return product ? [{ line, product }] : [];
  });
  const total = rows.reduce((sum, row) => sum + row.product.price * row.line.qty, 0);

  if (!hydrated) {
    return <p className="mt-6 text-muted">Chargement du panier…</p>;
  }

  if (receipt) {
    const receiptTotal = receipt.lines.reduce((sum, line) => sum + line.price * line.qty, 0);
    return (
      <section className="volt-rise mt-8 border border-line bg-surface p-6" aria-labelledby="confirmation-titre">
        <h2 id="confirmation-titre" className="font-display text-3xl">
          {demo.confirmationTitle}
        </h2>
        <p className="mt-4 leading-7">{demo.confirmationBody}</p>
        <p className="mt-4 leading-7">
          Référence d’affichage : <span className="tabular-nums">{receipt.reference}</span>. Elle n’est pas enregistrée.
        </p>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {receipt.lines.map((line) => (
            <li key={line.slug} className="flex items-baseline justify-between gap-4 py-3">
              <span>
                {line.name}
                <span className="text-muted"> × {line.qty}</span>
              </span>
              <span className="tabular-nums">{formatPrice(line.price * line.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-lg">
          Total indicatif : <Price value={receiptTotal} />
        </p>
        <p className="mt-4 text-sm leading-6 text-muted">
          Aucun paiement n’a été demandé. Aucune commande n’a été envoyée. Le panier de démonstration a été vidé.
        </p>
        <Link href="/catalogue" className="btn btn-primary mt-6">
          Retour au catalogue
        </Link>
      </section>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="mt-8 border border-line bg-surface p-6">
        <p>Le panier est vide. Ajoutez un produit avant la démonstration.</p>
        <Link href="/catalogue" className="btn btn-primary mt-5">
          Revenir au catalogue
        </Link>
      </div>
    );
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    const firstInvalid = fields.find((field) => nextErrors[field.name]);
    if (firstInvalid) {
      document.getElementById(firstInvalid.name)?.focus();
      return;
    }

    const snapshot = rows.map(({ line, product }) => ({
      slug: product.slug,
      name: product.name,
      qty: line.qty,
      price: product.price,
    }));
    clearCart();
    setForm(emptyForm);
    setReceipt({
      reference: nextDemoReference(),
      lines: snapshot,
    });
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <form className="border border-line bg-surface p-4 sm:p-6" onSubmit={onSubmit} noValidate>
        <h2 className="font-display text-2xl">Coordonnées d’essai</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Utilisez un jeu d’essai. Exemple : {demoSample.nom}, {demoSample.email}. Ces champs ne quittent pas cette page.
        </p>
        <button
          type="button"
          className="btn btn-ghost mt-4"
          onClick={() => {
            setForm({ ...demoSample });
            setErrors({});
          }}
        >
          Insérer un jeu d’essai
        </button>
        <div className="mt-5 space-y-4">
          {fields.map((field) => {
            const error = errors[field.name];
            const errorId = `${field.name}-erreur`;
            return (
              <div key={field.name}>
                <label htmlFor={field.name} className="field-label">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  className="field"
                  value={form[field.name]}
                  autoComplete={field.autoComplete}
                  inputMode={field.inputMode}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  suppressHydrationWarning
                  onChange={(event) =>
                    setForm((current) => ({ ...current, [field.name]: event.target.value }))
                  }
                />
                {error ? (
                  <p id={errorId} className="mt-1 text-sm text-[#f0c7b0]">
                    {error}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
        <button type="submit" className="btn btn-primary mt-6">
          Terminer la démonstration
        </button>
      </form>
      <aside className="h-fit border border-line bg-surface p-4" aria-label="Récapitulatif">
        <h2 className="font-display text-xl">Récapitulatif</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {rows.map(({ line, product }) => (
            <li key={product.slug} className="flex justify-between gap-3">
              <span>
                {product.name}
                <span className="text-muted"> × {line.qty}</span>
              </span>
              <span className="tabular-nums">{formatPrice(product.price * line.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-line pt-3 text-sm">
          <div className="flex justify-between gap-3">
            <dt>{shop.vatLabel}</dt>
            <dd className="tabular-nums">{formatPrice(vatPortion(total))}</dd>
          </div>
          <div className="flex justify-between gap-3 text-base">
            <dt>Total indicatif</dt>
            <dd className="tabular-nums">
              <Price value={total} />
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-sm leading-6 text-muted">Aucun moyen de paiement n’est demandé.</p>
      </aside>
    </div>
  );
}
