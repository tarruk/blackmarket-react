import {
  getProductStateLabel,
  ProductState,
  getProductStateColor,
} from "@/types";

interface ProductStateBadgeProps {
  state: string;
}

export default function ProductStateBadge({ state }: ProductStateBadgeProps) {
  return (
    <span
      className={`inline-block w-auto px-2 py-1 text-xs font-semibold rounded ${getProductStateColor(state)}`}
    >
      {getProductStateLabel(state)}
    </span>
  );
}
