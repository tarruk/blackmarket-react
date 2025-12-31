import Image from "next/image";
import { Product } from "@/types/product";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: number) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
}: ProductCardProps) {
  const imageUrl = product.pictures[0] || "";

  type ProductState = "totaly_new" | "used" | "refurbished";

  const stateColors: Record<ProductState, string> = {
    totaly_new: "bg-primary-blue text-white",
    used: "bg-purple-500  text-white",
    refurbished: "bg-primary-green text-white",
  };

  const stateLabel: Record<ProductState, string> = {
    totaly_new: "New",
    used: "Used",
    refurbished: "Refurbished",
  };

  const stateColor =
    stateColors[product.state as ProductState] || "bg-gray-100 text-gray-800";
  const stateText = stateLabel[product.state as ProductState] || product.state;

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col w-[264px] h-[377px]">
      <div className="relative w-full aspect-square overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="h-px shadow-2xs bg-product-card-border"></div>
      <div className="h-[129px] flex flex-col p-3 justify-between">
        <div className="flex justify-between">
          <span className="text-xl font-semibold text-gray-900">
            {product.unit_price}
          </span>
          <div className="">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded ${stateColor}`}
            >
              {stateText}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
            {product.title}
          </h3>
          <button
            onClick={() => onToggleFavorite?.(product.id)}
            aria-label="Toggle favorite"
          >
            {product.is_favorite ? (
              <IoMdHeart />
            ) : (
              <CiHeart className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
