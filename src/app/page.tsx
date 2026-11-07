import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ProductImage } from "@/components/product-image";
import { categories } from "@/config/shop";
import { categoryProductCount, productCountLabel, products } from "@/data/products";

const heroAlt =
  "Illustration prototype d’une tour PC de l’atelier VOLT CORE, châssis géométrique et arête bleue.";

export default function HomePage() {
  const featured = products.filter((product) => product.featured);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
        <div>
          <p className="text-sm tracking-[0.16em] text-muted uppercase">Atelier informatique</p>
          <h1 className="mt-4 max-w-[12ch] text-[clamp(2.7rem,8vw,5.4rem)] font-semibold">
            Monte en puissance.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
            PC, composants, écrans, périphériques et stockage, choisis et assemblés avec une ligne claire.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/catalogue" className="btn btn-primary">
              Explorer le catalogue
            </Link>
            <Link href="/catalogue?categorie=pc" className="btn btn-ghost">
              Voir les PC
            </Link>
          </div>
        </div>
        <div className="hero-glow volt-rise relative aspect-[5/4] w-full min-w-0">
          <ProductImage
            src="/images/hero-tour.svg"
            alt={heroAlt}
            priority
            sizes="(min-width: 1024px) 46rem, 100vw"
          />
        </div>
      </section>

      <section className="mt-16 sm:mt-20" aria-labelledby="titre-categories">
        <h2 id="titre-categories" className="text-3xl">
          Catégories
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {categories.map((category) => (
            <li key={category.id} className="min-w-0">
              <Link
                href={`/catalogue?categorie=${category.id}`}
                className="flex h-full min-h-36 flex-col border border-line bg-surface p-4"
              >
                <span className="font-display text-2xl">{category.label}</span>
                <span className="mt-2 text-sm leading-6 text-muted">{category.blurb}</span>
                <span className="mt-auto pt-4 text-sm tabular-nums">
                  {productCountLabel(categoryProductCount(category.id))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 sm:mt-20" aria-labelledby="titre-selection">
        <h2 id="titre-selection" className="text-3xl">
          Sélection
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((product, index) => (
            <li key={product.slug} className="min-w-0">
              <ProductCard product={product} heading="h3" priority={index === 0} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
