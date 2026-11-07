import Link from "next/link";
import { categories, shop } from "@/config/shop";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <p className="font-display text-lg tracking-[0.14em]">{shop.name}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">
            Atelier d’informatique, {shop.city}. Cette vitrine est une démonstration : le paiement, le stock réel et l’enregistrement des commandes ne sont pas connectés.
          </p>
        </div>
        <nav aria-label="Catégories">
          <h2 className="font-display text-base">Catégories</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link className="nav-link text-sm" href={`/catalogue?categorie=${category.id}`}>
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
