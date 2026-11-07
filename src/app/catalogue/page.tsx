import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CatalogFrame } from "@/components/catalog-controls";
import { ProductCard } from "@/components/product-card";
import { getBrands, productCountLabel } from "@/data/products";
import { filterProducts, hasNarrowing, parseCatalogQuery } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catalogue",
  description: "PC, composants, écrans, périphériques et stockage de l’atelier VOLT CORE.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default function CataloguePage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <CatalogResults searchParams={searchParams} />
    </Suspense>
  );
}

async function CatalogResults({ searchParams }: { searchParams: SearchParams }) {
  const query = parseCatalogQuery(await searchParams);
  const list = filterProducts(query);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-4xl sm:text-5xl">Catalogue</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Recherche par nom ou caractéristique. Les filtres se combinent.
      </p>
      {query.q ? (
        <p className="mt-4">
          Recherche : <span className="text-ink">« {query.q} »</span>
        </p>
      ) : null}
      <p className="mt-2 tabular-nums text-sm text-muted">{productCountLabel(list.length)}</p>
      <CatalogFrame query={query} brands={getBrands()}>
        {list.length === 0 ? (
          <div role="status" className="border border-line bg-surface p-6">
            <p>Aucun produit ne correspond à ces critères.</p>
            <Link href="/catalogue" className="btn btn-primary mt-5">
              Effacer les filtres
            </Link>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((product, index) => (
              <li key={product.slug} className="min-w-0">
                <ProductCard product={product} priority={index < 6} />
              </li>
            ))}
          </ul>
        )}
      </CatalogFrame>
      {hasNarrowing(query) && list.length > 0 ? (
        <p className="mt-6">
          <Link href="/catalogue" className="underline">
            Effacer les filtres
          </Link>
        </p>
      ) : null}
    </div>
  );
}

function CatalogFallback() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-4xl sm:text-5xl">Catalogue</h1>
      <p className="mt-4 text-muted">Chargement du catalogue…</p>
    </div>
  );
}
