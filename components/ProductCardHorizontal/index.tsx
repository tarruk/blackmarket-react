import { Product } from "@/types";
import ProductStateBadge from "../ProductStateBadge";
import { IoMdHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import Button from "../Button";
import { FaShoppingCart } from "react-icons/fa";

interface ProductCardHorizontalProps {
  product: Product;
  isLast: boolean;
}

export default function ProductCardHorizontal({
  product,
  isLast,
}: ProductCardHorizontalProps) {
  const imageURL = product.pictures[0];
  return (
    <div
      className={`sm:rounded-lg ${!isLast ? "border-b sm:border-b-0" : ""} flex bg-white h-[182px] shadow-xl overflow-hidden`}
    >
      <div className="h-full w-[40%] sm:w-[197px] shrink-0 sm:m-0 m-auto bg-blue">
        <img
          className="h-full w-full object-contain rounded-l-lg"
          src={imageURL}
          alt={product.title}
        />
      </div>
      <div className="flex justify-between w-full sm:p-10 p-2">
        <div className="flex justify-between w-ful">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="font-bold mb-2">{product.title}</h2>
              <div>
                <ProductStateBadge state={product.state} />
              </div>
            </div>
            <p>{product.unitPrice}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center">
          <button
            onClick={() => {}}
            aria-label="Toggle favorite"
          >
            {product.isFavorite ? (
              <IoMdHeart size={24} />
            ) : (
              <CiHeart size={24} />
            )}
          </button>
          <Button
            className="hidden sm:flex"
            variant="primary"
          >
            Add to cart
          </Button>
          <Button
            className="flex sm:hidden"
            variant="primary"
          >
            <FaShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  );
}
