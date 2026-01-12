import type { Product, ProductsResponse } from "@/types/product";
import { transformProductsResponse, transformProduct } from "@/types/product";
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
  unitPriceMin?: string;
  unitPriceMax?: string;
}

function camelToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function buildQueryString(params: GetProductsParams): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    const apiKey = camelToSnakeCase(key);

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null && item !== "") {
          searchParams.append(apiKey, String(item));
        }
      });
    } else {
      searchParams.append(apiKey, String(value));
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

  const apiData = await response.json();
  return transformProductsResponse(apiData);
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

  const apiData = await response.json();
  return transformProduct(apiData);
}

export type { Product, ProductsResponse };
