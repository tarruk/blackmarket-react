export interface Category {
  id: number;
  name: string;
  description: string | null;
}

export interface Subcategory {
  id: number;
  name: string;
  description: string | null;
}

interface ProductApiResponse {
  id: number;
  title: string;
  description: string;
  state: string;
  stock: number;
  is_favorite: boolean;
  unit_price: string;
  pictures: string[];
  category: Category;
  subcategories: Subcategory[];
}

interface PaginationApiResponse {
  first_url: string;
  prev_url: string;
  page_url: string;
  next_url: string;
  last_url: string;
  count: number;
  page: number;
  items: number;
}

interface ProductsResponseApi {
  data: ProductApiResponse[];
  pagination: PaginationApiResponse;
}

export type ProductState = "totaly_new" | "used" | "refurbished";

export interface ProductStateConfig {
  label: string;
  colorClasses: string;
  value: ProductState;
}

export const PRODUCT_STATE_CONFIG: Record<ProductState, ProductStateConfig> = {
  totaly_new: {
    label: "New",
    value: "totaly_new",
    colorClasses: "bg-primary-blue text-white",
  },
  used: {
    label: "Used",
    value: "used",
    colorClasses: "bg-purple-500 text-white",
  },
  refurbished: {
    label: "Refurbished",
    value: "refurbished",
    colorClasses: "bg-primary-green text-white",
  },
};

const DEFAULT_STATE_CONFIG: ProductStateConfig = {
  label: "new",
  value: "totaly_new",
  colorClasses: "bg-gray-100 text-gray-800",
};

export function getProductStateConfig(state: string): ProductStateConfig {
  const config = PRODUCT_STATE_CONFIG[state as ProductState];
  return config || { ...DEFAULT_STATE_CONFIG, label: state };
}

export function getProductStateLabel(state: string): string {
  return getProductStateConfig(state).label;
}

export function getProductStateColor(state: string): string {
  return getProductStateConfig(state).colorClasses;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  state: string;
  stock: number;
  isFavorite: boolean;
  unitPrice: string;
  pictures: string[];
  category: Category;
  subcategories: Subcategory[];
  rawPrice: number;
}

export interface Pagination {
  firstUrl: string;
  prevUrl: string;
  pageUrl: string;
  nextUrl: string;
  lastUrl: string;
  count: number;
  page: number;
  items: number;
}

export interface ProductsResponse {
  data: Product[];
  pagination: Pagination;
}

function extractRawPrice(priceString: string): number {
  const cleaned = priceString.replace(/[^\d.-]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function transformProduct(apiProduct: ProductApiResponse): Product {
  const unitPrice = apiProduct.unit_price;
  return {
    id: apiProduct.id,
    title: apiProduct.title,
    description: apiProduct.description,
    state: apiProduct.state,
    stock: apiProduct.stock,
    isFavorite: apiProduct.is_favorite,
    unitPrice,
    pictures: apiProduct.pictures,
    category: apiProduct.category,
    subcategories: apiProduct.subcategories,
    rawPrice: extractRawPrice(unitPrice),
  };
}

function transformPagination(apiPagination: PaginationApiResponse): Pagination {
  return {
    firstUrl: apiPagination.first_url,
    prevUrl: apiPagination.prev_url,
    pageUrl: apiPagination.page_url,
    nextUrl: apiPagination.next_url,
    lastUrl: apiPagination.last_url,
    count: apiPagination.count,
    page: apiPagination.page,
    items: apiPagination.items,
  };
}

export function transformProductsResponse(
  apiResponse: ProductsResponseApi,
): ProductsResponse {
  return {
    data: apiResponse.data.map(transformProduct),
    pagination: transformPagination(apiResponse.pagination),
  };
}
