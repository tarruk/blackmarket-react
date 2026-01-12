"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/products";
import type { Product, ProductsResponse, ProductState } from "@/types/product";
import Button from "../Button";
import { useErrorHandler } from "@/hooks";
import { useToastContext } from "@/contexts/ToastContext";
import ProductCardHorizontal from "../ProductCardHorizontal";
import { Dropdown } from "../Dropdown";
import { SORT_OPTIONS, SortOption } from "@/types/sortOptions";

interface ProductsCatalogProps {
  query: string;
  filter: ProductState | null;
  maxPrice: string | null;
  minPrice: string | null;
}

export default function ProductsCatalog({
  query,
  filter,
  minPrice,
  maxPrice,
}: ProductsCatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { error, handleError, clearError } = useErrorHandler();
  const { showError } = useToastContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const itemsPerPage = 12;

  const loadProducts = async (
    page: number = 1,
    searchText?: string,
    filter?: ProductState,
    minPrice?: string,
    maxPrice?: string,
  ) => {
    try {
      setIsLoading(true);
      clearError();

      const response: ProductsResponse = await getProducts({
        page,
        items: itemsPerPage,
        ...(searchText && { text: searchText }),
        ...(filter && { title: filter }),
        ...(minPrice && { unitPriceMin: minPrice }),
        ...(maxPrice && { unitPriceMax: maxPrice }),
      });

      setProducts(response.data);
      setCurrentPage(response.pagination.page);

      const pages = Math.ceil(response.pagination.count / itemsPerPage);
      setTotalPages(pages);
      setTotalItems(response.pagination.count);
    } catch (err) {
      handleError(err);
      showError(err);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    loadProducts(
      1,
      query || undefined,
      filter || undefined,
      minPrice || undefined,
      maxPrice || undefined,
    );
  }, [query, filter, minPrice, maxPrice]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      loadProducts(
        newPage,
        query || undefined,
        filter || undefined,
        minPrice || undefined,
        maxPrice || undefined,
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAddToCart = (product: Product) => {
    console.log("Add to cart:", product);
  };

  const handleToggleFavorite = (productId: number) => {
    console.log("Toggle favorite:", productId);
  };

  if (isLoading && products.length === 0) {
    return (
      <div className="relative z-10 w-full">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="relative z-10 w-full">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              onClick={() =>
                loadProducts(
                  1,
                  query || undefined,
                  filter || undefined,
                  minPrice || undefined,
                  maxPrice || undefined,
                )
              }
            >
              Try again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <div className="relative z-10 w-full">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-2">No products found</p>
            {query && (
              <p className="text-gray-500">Try searching for something else</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          {query ? (
            <h2 className="text-2xl font-bold text-gray-900">
              You searched for &quot;{query}&quot;
            </h2>
          ) : (
            <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Sort by</span>
          <Dropdown
            label={SORT_OPTIONS[sortOption].label}
            items={[
              {
                label: "Most Recent",
                action: () => {
                  setSortOption("recent");
                },
              },
              {
                label: "Price: Low to High",
                action: () => {
                  setSortOption("fromLowPrice");
                },
              },
              {
                label: "Price: High to Low",
                action: () => {
                  setSortOption("fromHighPrice");
                },
              },
              {
                label: "Newest First",
                action: () => {
                  setSortOption("newest");
                },
              },
              {
                label: "Oldest First",
                action: () => {
                  setSortOption("oldest");
                },
              },
            ]}
            variant="default"
            position="right"
          />
        </div>
      </div>

      <div className="flex flex-col sm:gap-6 gap-0 mb-8">
        {products
          .slice()
          .sort((a, b) => {
            switch (sortOption) {
              case "recent":
              case "newest":
                return b.id - a.id;
              case "fromLowPrice":
                return a.rawPrice - b.rawPrice;
              case "fromHighPrice":
                return b.rawPrice - a.rawPrice;
              case "oldest":
                return a.id - b.id;
              default:
                return 0;
            }
          })
          .map((product, index, sortedProducts) => (
            <ProductCardHorizontal
              isLast={index === sortedProducts.length - 1}
              key={product.id}
              product={product}
            />
          ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="md"
            disabled={currentPage === 1 || isLoading}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;

              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "primary" : "outline"}
                  size="md"
                  disabled={isLoading}
                  onClick={() => handlePageChange(pageNum)}
                  className="min-w-[40px]"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="md"
            disabled={currentPage === totalPages || isLoading}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="text-center mt-4 text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
      )}
    </div>
  );
}
