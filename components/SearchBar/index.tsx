"use client";

import { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function Searchbar({
  onSearch,
  placeholder = "Search product...",
}: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="bg-white rounded-md h-10 flex items-center px-3 gap-2 min-w-0 max-w-[470px] w-full">
      <input
        type="text"
        name="product-search"
        id="product-search"
        placeholder={placeholder}
        className="flex-1 focus:ring-0 outline-none focus:outline-none focus-visible:outline-none"
        onChange={handleChange}
      />
      <FaSearch className="text-gray-400 shrink-0" />
    </div>
  );
}
