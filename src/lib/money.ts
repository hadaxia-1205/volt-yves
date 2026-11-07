import { shop } from "@/config/shop";

const priceFormat = new Intl.NumberFormat(shop.locale, {
  style: "currency",
  currency: shop.currency,
});

export function formatPrice(value: number) {
  return priceFormat.format(value);
}

export function vatPortion(totalIncludingTax: number) {
  return totalIncludingTax - totalIncludingTax / (1 + shop.vatRate);
}
