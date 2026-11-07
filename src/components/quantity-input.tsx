"use client";

import { shop } from "@/config/shop";

export function QuantityInput({
  value,
  onChange,
  label = "Quantité",
}: {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}) {
  function update(next: number) {
    if (!Number.isFinite(next)) return;
    onChange(Math.max(1, Math.min(shop.maxQuantity, Math.floor(next))));
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="btn btn-ghost min-w-11 px-0"
        onClick={() => update(value - 1)}
        aria-label="Diminuer la quantité"
      >
        −
      </button>
      <input
        className="field w-16 text-center tabular-nums"
        inputMode="numeric"
        type="number"
        min={1}
        max={shop.maxQuantity}
        value={value}
        aria-label={label}
        onChange={(event) => update(Number(event.target.value))}
        suppressHydrationWarning
      />
      <button
        type="button"
        className="btn btn-ghost min-w-11 px-0"
        onClick={() => update(value + 1)}
        aria-label="Augmenter la quantité"
      >
        +
      </button>
    </div>
  );
}
