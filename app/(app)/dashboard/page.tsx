"use client";

import NavBar from "@/components/NavBar";
import ProductsListPreview from "@/components/ProductsListPreview";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white gap-5">
      <div className="h-[300px] fixed inset-0 z-0 bg-black"></div>
      <NavBar onSearch={handleSearch} />
      <div className="">
        <ProductsListPreview />
      </div>
    </div>
  );
}
