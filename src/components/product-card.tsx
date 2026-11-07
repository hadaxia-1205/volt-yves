import Link from "next/link";
import { Price } from "@/components/price";
import { ProductImage } from "@/components/product-image";
import type { Product } from "@/data/products";

export function ProductCard({
  product,
  heading = "h2",
  priority = false,
}: {
  product: Product;
  heading?: "h2" | "h3";
  priority?: boolean;
}) {
  const Title = heading;
  const image = product.images[0];

  return (
    <article className="h-full min-w-0">
      <Link
        href={`/produit/${product.slug}`}
        className="card-link flex h-full flex-col border border-line bg-surface"
      >
        <div className="relative aspect-[5/4] bg-[#171b20]">
          <ProductImage
            src={image.src}
            alt={image.alt}
            priority={priority}
            sizes="(min-width: 1280px) 22rem, (min-width: 640px) 45vw, 100vw"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <Title className="min-h-[2.4em] font-display text-xl leading-tight text-ink">
            {product.name}
          </Title>
          <ul className="space-y-1 text-sm leading-5 text-muted">
            <li>{product.highlights[0]}</li>
            <li>{product.highlights[1]}</li>
          </ul>
          <Price value={product.price} className="mt-auto pt-2 text-lg text-ink" />
        </div>
        <span className="btn btn-primary mx-4 mb-4">Voir le produit</span>
      </Link>
    </article>
  );
}
