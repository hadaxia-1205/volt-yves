import { shop } from "@/config/shop";
import { getProduct } from "@/data/products";

export type CartLine = {
  slug: string;
  qty: number;
};

const EMPTY: CartLine[] = [];
const CART_EVENT = "volt-core-panier-change";

let cacheRaw: string | null | undefined;
let cacheLines: CartLine[] = EMPTY;

function clampQty(qty: number) {
  return Math.max(1, Math.min(shop.maxQuantity, Math.floor(qty)));
}

function parse(raw: string | null): CartLine[] {
  if (!raw) return EMPTY;
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return EMPTY;
    const lines: CartLine[] = [];
    for (const item of data) {
      if (!item || typeof item !== "object") continue;
      const slug = "slug" in item ? item.slug : undefined;
      const qty = "qty" in item ? item.qty : undefined;
      if (typeof slug !== "string" || typeof qty !== "number") continue;
      if (!getProduct(slug) || !Number.isFinite(qty)) continue;
      lines.push({ slug, qty: clampQty(qty) });
    }
    return lines;
  } catch {
    return EMPTY;
  }
}

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(shop.cartStorageKey);
  if (raw === cacheRaw) return cacheLines;
  cacheRaw = raw;
  cacheLines = parse(raw);
  return cacheLines;
}

export function writeCart(lines: CartLine[]) {
  const raw = JSON.stringify(lines);
  cacheRaw = raw;
  cacheLines = lines;
  try {
    window.localStorage.setItem(shop.cartStorageKey, raw);
  } catch {
    // Mode privé ou quota : le panier reste visible pour cette visite.
  }
  window.dispatchEvent(new Event(CART_EVENT));
}

export function subscribeCart(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CART_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CART_EVENT, onStoreChange);
  };
}

export function addToCart(slug: string, qty: number) {
  if (!getProduct(slug)) return;
  const lines = readCart().map((line) => ({ ...line }));
  const existing = lines.find((line) => line.slug === slug);
  if (existing) {
    existing.qty = clampQty(existing.qty + qty);
  } else {
    lines.push({ slug, qty: clampQty(qty) });
  }
  writeCart(lines);
}

export function setCartQty(slug: string, qty: number) {
  const lines = readCart().map((line) =>
    line.slug === slug ? { slug, qty: clampQty(qty) } : line,
  );
  writeCart(lines);
}

export function removeFromCart(slug: string) {
  writeCart(readCart().filter((line) => line.slug !== slug));
}

export function clearCart() {
  writeCart([]);
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((total, line) => total + line.qty, 0);
}

export const serverCartSnapshot: CartLine[] = EMPTY;
