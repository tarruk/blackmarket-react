export type SortOption =
  | "recent"
  | "fromLowPrice"
  | "fromHighPrice"
  | "newest"
  | "oldest";

interface SortOptionConfig {
  label: string;
  value: SortOption;
}

export const SORT_OPTIONS: Record<SortOption, SortOptionConfig> = {
  recent: {
    label: "Most Recent",
    value: "recent",
  },
  fromLowPrice: {
    label: "Price: Low to High",
    value: "fromLowPrice",
  },
  fromHighPrice: {
    label: "Price: High to Low",
    value: "fromHighPrice",
  },
  newest: {
    label: "Newest First",
    value: "newest",
  },
  oldest: {
    label: "Oldest First",
    value: "oldest",
  },
};
