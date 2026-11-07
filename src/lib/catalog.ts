import {
  availabilityOptions,
  categories,
  sortOptions,
  type Availability,
  type CategoryId,
  type SortId,
} from "@/config/shop";
import { products, searchHaystack, type Product } from "@/data/products";

export type CatalogQuery = {
  q: string;
  categorie: CategoryId | "";
  marques: string[];
  prixMin: number | null;
  prixMax: number | null;
  dispo: Availability | "";
  tri: SortId;
};

type RawSearch = Record<string, string | string[] | undefined>;

const categoryIds = new Set<string>(categories.map((category) => category.id));
const availabilityIds = new Set<string>(
  availabilityOptions.map((option) => option.id),
);
const sortIds = new Set<string>(sortOptions.map((option) => option.id));

function first(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function many(value: string | string[] | undefined) {
  const source = Array.isArray(value) ? value : value ? [value] : [];
  return [...new Set(source.map((item) => item.trim()).filter(Boolean))];
}

function priceBound(value: string) {
  const trimmed = value.trim().replace(",", ".");
  if (!trimmed) return null;
  const number = Number(trimmed);
  if (!Number.isFinite(number) || number < 0) return null;
  return number;
}

export function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("fr-CH");
}

export function parseCatalogQuery(raw: RawSearch): CatalogQuery {
  const categorie = first(raw.categorie);
  const dispo = first(raw.dispo);
  const tri = first(raw.tri);

  return {
    q: first(raw.q).trim(),
    categorie: categoryIds.has(categorie) ? (categorie as CategoryId) : "",
    marques: many(raw.marque),
    prixMin: priceBound(first(raw.prixMin)),
    prixMax: priceBound(first(raw.prixMax)),
    dispo: availabilityIds.has(dispo) ? (dispo as Availability) : "",
    tri: sortIds.has(tri) ? (tri as SortId) : "nom-asc",
  };
}

export function filterProducts(query: CatalogQuery) {
  const needle = normalizeText(query.q);
  const marques = new Set(query.marques.map((brand) => normalizeText(brand)));

  const list = products.filter((product) => {
    if (query.categorie && product.category !== query.categorie) return false;
    if (marques.size > 0 && !marques.has(normalizeText(product.brand))) {
      return false;
    }
    if (query.dispo && product.availability !== query.dispo) return false;
    if (query.prixMin != null && product.price < query.prixMin) return false;
    if (query.prixMax != null && product.price > query.prixMax) return false;
    if (needle && !normalizeText(searchHaystack(product)).includes(needle)) {
      return false;
    }
    return true;
  });

  return list.sort((a, b) => compareProducts(a, b, query.tri));
}

function compareProducts(a: Product, b: Product, tri: SortId) {
  if (tri === "prix-asc") return a.price - b.price || byName(a, b);
  if (tri === "prix-desc") return b.price - a.price || byName(a, b);
  if (tri === "nom-desc") return byName(b, a);
  return byName(a, b);
}

function byName(a: Product, b: Product) {
  return a.name.localeCompare(b.name, "fr");
}

export function activeFilterCount(query: CatalogQuery) {
  return (
    (query.categorie ? 1 : 0) +
    query.marques.length +
    (query.prixMin != null ? 1 : 0) +
    (query.prixMax != null ? 1 : 0) +
    (query.dispo ? 1 : 0)
  );
}

export function hasNarrowing(query: CatalogQuery) {
  return Boolean(query.q) || activeFilterCount(query) > 0 || query.tri !== "nom-asc";
}
