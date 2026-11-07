"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  availabilityOptions,
  categories,
  shop,
  sortOptions,
} from "@/config/shop";
import { activeFilterCount, type CatalogQuery } from "@/lib/catalog";

function HiddenLines({
  query,
  omit,
}: {
  query: CatalogQuery;
  omit: Array<keyof CatalogQuery>;
}) {
  const skip = new Set(omit);
  return (
    <>
      {!skip.has("q") && query.q ? <input type="hidden" name="q" value={query.q} /> : null}
      {!skip.has("categorie") && query.categorie ? (
        <input type="hidden" name="categorie" value={query.categorie} />
      ) : null}
      {!skip.has("marques")
        ? query.marques.map((brand) => (
            <input key={brand} type="hidden" name="marque" value={brand} />
          ))
        : null}
      {!skip.has("prixMin") && query.prixMin != null ? (
        <input type="hidden" name="prixMin" value={query.prixMin} />
      ) : null}
      {!skip.has("prixMax") && query.prixMax != null ? (
        <input type="hidden" name="prixMax" value={query.prixMax} />
      ) : null}
      {!skip.has("dispo") && query.dispo ? (
        <input type="hidden" name="dispo" value={query.dispo} />
      ) : null}
      {!skip.has("tri") && query.tri !== "nom-asc" ? (
        <input type="hidden" name="tri" value={query.tri} />
      ) : null}
    </>
  );
}

export function CatalogFrame({
  query,
  brands,
  children,
}: {
  query: CatalogQuery;
  brands: string[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const count = activeFilterCount(query);
  const formKey = JSON.stringify(query);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!desktop) closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    if (!desktop) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  function closePanel() {
    setOpen(false);
    toggleRef.current?.focus();
  }

  return (
    <div className="mt-6 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start lg:gap-8">
      <aside
        id="panneau-filtres"
        aria-labelledby={titleId}
        style={open ? { top: "var(--header-h)" } : undefined}
        className={
          open
            ? "fixed inset-x-0 bottom-0 z-30 overflow-y-auto border-t border-line bg-bg px-4 py-4 lg:static lg:z-auto lg:overflow-visible lg:border-0 lg:bg-transparent lg:px-0 lg:py-0"
            : "hidden lg:block"
        }
      >
        <div className="mb-4 flex items-center justify-between gap-3 lg:mb-3">
          <h2 id={titleId} className="font-display text-xl">
            Filtres
          </h2>
          <button ref={closeRef} type="button" className="btn btn-ghost lg:hidden" onClick={closePanel}>
            Fermer
          </button>
        </div>
        <form
          key={formKey}
          action="/catalogue"
          method="get"
          className="space-y-5 border border-line bg-surface p-4"
          onSubmit={() => setOpen(false)}
        >
          <HiddenLines query={query} omit={["categorie", "marques", "prixMin", "prixMax", "dispo"]} />
          <div>
            <label htmlFor="categorie" className="field-label">
              Catégorie
            </label>
            <select id="categorie" name="categorie" className="field" defaultValue={query.categorie}>
              <option value="">Toutes</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <fieldset>
            <legend className="field-label">Marque</legend>
            <div className="mt-2 space-y-1">
              {brands.map((brand) => (
                <label key={brand} className="flex min-h-11 items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    name="marque"
                    value={brand}
                    defaultChecked={query.marques.includes(brand)}
                    className="size-5 accent-[#2457ea]"
                    suppressHydrationWarning
                  />
                  {brand}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid grid-cols-2 gap-3">
            <div className="min-w-0">
              <label htmlFor="prixMin" className="field-label">
                Prix min. (CHF)
              </label>
              <input
                id="prixMin"
                name="prixMin"
                className="field tabular-nums"
                type="number"
                inputMode="numeric"
                min={shop.priceFilter.min}
                max={shop.priceFilter.max}
                step={shop.priceFilter.step}
                defaultValue={query.prixMin ?? ""}
                suppressHydrationWarning
              />
            </div>
            <div className="min-w-0">
              <label htmlFor="prixMax" className="field-label">
                Prix max. (CHF)
              </label>
              <input
                id="prixMax"
                name="prixMax"
                className="field tabular-nums"
                type="number"
                inputMode="numeric"
                min={shop.priceFilter.min}
                max={shop.priceFilter.max}
                step={shop.priceFilter.step}
                defaultValue={query.prixMax ?? ""}
                suppressHydrationWarning
              />
            </div>
          </div>
          <div>
            <label htmlFor="dispo" className="field-label">
              Disponibilité
            </label>
            <select id="dispo" name="dispo" className="field" defaultValue={query.dispo}>
              <option value="">Toutes</option>
              {availabilityOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="submit" className="btn btn-primary">
              Appliquer
            </button>
            <Link href="/catalogue" className="btn btn-ghost">
              Effacer les filtres
            </Link>
          </div>
        </form>
      </aside>

      <div className="min-w-0">
        <div className="flex flex-wrap items-end gap-3">
          <button
            ref={toggleRef}
            type="button"
            className="btn btn-ghost lg:hidden"
            aria-expanded={open}
            aria-controls="panneau-filtres"
            onClick={() => setOpen(true)}
          >
            {count ? `Filtres (${count})` : "Filtres"}
          </button>
          <form action="/catalogue" method="get" className="flex min-w-0 flex-1 flex-wrap items-end gap-2">
            <HiddenLines query={query} omit={["tri"]} />
            <div className="min-w-0 flex-1 sm:max-w-xs">
              <label htmlFor="tri" className="field-label">
                Trier
              </label>
              <select id="tri" name="tri" className="field" defaultValue={query.tri} key={`${formKey}-tri`}>
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-ghost">
              Trier
            </button>
          </form>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
