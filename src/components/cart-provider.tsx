"use client";

import { useSyncExternalStore } from "react";
import {
  addToCart,
  cartCount,
  clearCart,
  readCart,
  removeFromCart,
  serverCartSnapshot,
  setCartQty,
  subscribeCart,
  type CartLine,
} from "@/lib/cart-store";

function subscribeHydration() {
  return () => {};
}

export function useHydrated() {
  return useSyncExternalStore(subscribeHydration, () => true, () => false);
}

export function useCartLines() {
  return useSyncExternalStore(subscribeCart, readCart, () => serverCartSnapshot);
}

export function useCartCount() {
  const lines = useCartLines();
  const hydrated = useHydrated();
  return hydrated ? cartCount(lines) : 0;
}

export function useCartActions() {
  return { addToCart, setCartQty, removeFromCart, clearCart };
}

export type { CartLine };
