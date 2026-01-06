"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/products";
import type { Product } from "@/types/product";
import ProductCard from "../ProductCard";
import Loader from "../Loader";
import { useErrorHandler } from "@/hooks";
import { useToastContext } from "@/contexts/ToastContext";

export default function ProductsListPreview() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { error, handleError, clearError } = useErrorHandler();
  const { showError } = useToastContext();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        clearError();
        const response = await getProducts({ page: 1, items: 4 });
        setProducts(response.data);
      } catch (err) {
        handleError(err);
        showError(err);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [clearError, handleError, showError]);

  const handleAddToCart = (product: Product) => {
    console.log("Add to cart:", product);
  };

  const handleToggleFavorite = (productId: number) => {
    console.log("Toggle favorite:", productId);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className=" sm:gap-4 justify-between items-center gap-8 py-3  lg:px-20">
      <div className="sm:hidden mb-6 px-6">
        <div className="grid grid-flow-col auto-cols-[280px] gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </div>

      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 sm:px-10 lg:px-0">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      <div className="flex justify-center"></div>
    </div>
  );
}
