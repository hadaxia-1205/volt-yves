"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { navigation, shop } from "@/config/shop";
import { useCartCount, useHydrated } from "@/components/cart-provider";

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6.5 7.5h11l-.8 11h-9.4l-.8-11z" />
      <path d="M9 7.5V6a3 3 0 0 1 6 0v1.5" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16.5 20 20.5" />
    </svg>
  );
}

function HeaderBar({ query }: { query: string }) {
  const pathname = usePathname();
  const count = useCartCount();
  const hydrated = useHydrated();
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const articleLabel = count > 1 ? "articles" : "article";
  const cartLabel = hydrated ? `Panier, ${count} ${articleLabel}` : "Panier";

  useEffect(() => {
    const element = headerRef.current;
    if (!element) return;
    const apply = () => {
      document.documentElement.style.setProperty(
        "--header-h",
        `${element.getBoundingClientRect().height}px`,
      );
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(element);
    return () => observer.disconnect();
  }, [menuOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-4 py-3">
        <Link href="/" className="shrink-0 font-display text-sm tracking-[0.16em] text-ink">
          {shop.name}
        </Link>
        <nav className="ml-4 hidden items-center gap-4 lg:flex" aria-label="Pages">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form
          role="search"
          action="/catalogue"
          method="get"
          className="ml-auto flex min-w-0 flex-1 items-center gap-1 lg:max-w-sm"
        >
          <label htmlFor="recherche" className="sr-only">
            Recherche
          </label>
          <input
            id="recherche"
            key={query}
            className="field min-w-0"
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Nom ou caractéristique"
            suppressHydrationWarning
          />
          <button type="submit" className="btn btn-ghost shrink-0 px-3" aria-label="Rechercher">
            <SearchIcon />
          </button>
        </form>
        <Link href="/panier" className="btn btn-ghost shrink-0 gap-2 px-3" aria-label={cartLabel}>
          <CartIcon />
          <span className="hidden sm:inline">Panier</span>
          <span className="min-w-[1.25rem] tabular-nums">{hydrated ? count : "–"}</span>
        </Link>
        <button
          type="button"
          className="btn btn-ghost shrink-0 px-3 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="navigation-mobile"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>
      </div>
      {menuOpen ? (
        <nav id="navigation-mobile" className="flex flex-wrap gap-2 border-t border-line px-4 py-2 lg:hidden" aria-label="Pages">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

function HeaderBarWithQuery() {
  const params = useSearchParams();
  return <HeaderBar query={params.get("q") ?? ""} />;
}

export function SiteHeader() {
  return (
    <Suspense fallback={<HeaderBar query="" />}>
      <HeaderBarWithQuery />
    </Suspense>
  );
}
