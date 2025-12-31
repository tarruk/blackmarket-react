import { FaCartShopping } from "react-icons/fa6";

export default function CartButton() {
  return (
    <button className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm text-white hover:bg-white/10 transition-all whitespace-nowrap shrink-0">
      Shopping Cart
      <FaCartShopping />
    </button>
  );
}
