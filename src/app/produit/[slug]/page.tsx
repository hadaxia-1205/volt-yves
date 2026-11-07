import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Price } from "@/components/price";
import { ProductGallery } from "@/components/product-gallery";
import { PurchasePanel } from "@/components/purchase-panel";
import { shop, getCategory } from "@/config/shop";
import { getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return { title: "Produit introuvable" };
  }
  return {
    title: {
      absolute: `${product.name} — ${product.highlights[0]} | ${shop.name}`,
    },
    description: product.description,
  };
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
          <p className="text-muted">Chargement du produit…</p>
        </div>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);

  return (
    <article className="pcb-page">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <nav aria-label="Fil d’Ariane" className="text-sm text-muted">
          <ol className="flex flex-wrap gap-x-2 gap-y-1">
            <li>
              <Link href="/" className="underline">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/catalogue" className="underline">
                Catalogue
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/catalogue?categorie=${product.category}`} className="underline">
                {category?.label}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <ProductGallery images={product.images} />
          <div className="min-w-0 border border-line bg-surface p-5 sm:p-7">
            <p className="text-sm tracking-[0.14em] text-muted uppercase">{product.brand}</p>
            <h1 className="mt-3 text-4xl sm:text-5xl">{product.name}</h1>
            <p className="mt-5 text-2xl">
              <Price value={product.price} />
            </p>
            <p className="mt-1 text-sm text-muted">{shop.vatLabel}</p>
            <p className="mt-5 leading-7">{product.description}</p>
            <PurchasePanel product={product} />
          </div>
        </div>

        <section className="mt-8 border border-line bg-surface p-5 sm:p-7" aria-labelledby="titre-specs">
          <h2 id="titre-specs" className="text-2xl">
            Caractéristiques
          </h2>
          <table className="mt-4 w-full text-left">
            <tbody>
              {product.specs.map((spec) => (
                <tr key={spec.label} className="border-t border-line">
                  <th scope="row" className="w-[42%] py-3 pr-4 align-top font-normal text-muted">
                    {spec.label}
                  </th>
                  <td className="py-3 align-top tabular-nums">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </article>
  );
}
