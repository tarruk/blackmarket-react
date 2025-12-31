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

export interface Product {
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

export interface Pagination {
  first_url: string;
  prev_url: string;
  page_url: string;
  next_url: string;
  last_url: string;
  count: number;
  page: number;
  items: number;
}

export interface ProductsResponse {
  data: Product[];
  pagination: Pagination;
}
