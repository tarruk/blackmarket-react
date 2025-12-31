import type { Product, ProductsResponse } from "@/types/product";
import { authStorage } from "@/utils/auth-storage";
import { ApiError } from "@/utils/api-error";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface GetProductsParams {
  page?: number;
  items?: number;
  text?: string;
  title?: string;
  description?: string;
  categories?: string[];
  states?: string[];
  unit_price_min?: string;
  unit_price_max?: string;
}
function buildQueryString(params: GetProductsParams): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null && item !== "") {
          searchParams.append(key, String(item));
        }
      });
    } else {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export async function getProducts(
  params: GetProductsParams = {},
): Promise<ProductsResponse> {
  const queryString = buildQueryString(params);
  const url = `${API_URL}/api/v1/products${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    headers: authStorage.getAuthHeaders(),
  });

  if (!response.ok) {
    throw await ApiError.fromResponse(response);
  }

  const data: ProductsResponse = await response.json();
  return data;
}

export async function getProductById(id: number): Promise<Product> {
  const url = `${API_URL}/api/v1/products/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: authStorage.getAuthHeaders(),
  });

  if (!response.ok) {
    throw await ApiError.fromResponse(response);
  }

  const data = await response.json();
  return data;
}

export type { Product, ProductsResponse };
