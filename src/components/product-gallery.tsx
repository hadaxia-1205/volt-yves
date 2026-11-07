"use client";

import { useState } from "react";
import { ProductImage } from "@/components/product-image";
import type { ProductImage as Picture } from "@/data/products";

export function ProductGallery({ images }: { images: Picture[] }) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[5/4] border border-line bg-[#171b20]">
        <ProductImage
          src={current.src}
          alt={current.alt}
          priority
          sizes="(min-width: 1024px) 36rem, 100vw"
        />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {images.map((image, imageIndex) => (
          <button
            key={image.src}
            type="button"
            className={`relative aspect-[5/4] border bg-[#171b20] ${
              imageIndex === index ? "border-blue" : "border-line"
            }`}
            aria-pressed={imageIndex === index}
            aria-label={image.alt}
            onClick={() => setIndex(imageIndex)}
          >
            <ProductImage src={image.src} alt="" sizes="8rem" priority={imageIndex === 0} />
          </button>
        ))}
      </div>
    </div>
  );
}
