"use client";

import { useSearchParams } from "next/navigation";
import ProductsCatalog from "@/components/ProductsCatalog";
import ProductsFilter from "@/components/ProductsFilter";
import { ProductState } from "@/types";
import { useState } from "react";
import { useDebounce } from "@/hooks";

export default function Products() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";
  const [productState, setProductState] = useState<ProductState | null>(null);
  const [minPrice, setMinPrice] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<string | null>(null);

  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  return (
    <div className="min-h-screen bg-general-background">
      <div className="flex px-4 py-8 gap-8 mx-auto max-w-7xl">
        <ProductsFilter
          className="hidden md:block"
          onStateChanged={(state) => setProductState(state)}
          minPriceChanged={(price) => setMinPrice(price === "" ? null : price)}
          maxPriceChanged={(price) => setMaxPrice(price === "" ? null : price)}
        />
        <div className="flex-1 min-w-0">
          <ProductsCatalog
            minPrice={debouncedMinPrice}
            maxPrice={debouncedMaxPrice}
            query={query}
            filter={productState}
          />
        </div>
      </div>
    </div>
  );
}
