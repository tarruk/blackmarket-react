"use client";

import { PRODUCT_STATE_CONFIG, ProductState } from "@/types";
import Searchbar from "../SearchBar";
import TextField from "../TextField";
import Button from "../Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { cn } from "@/utils/cn";
import { useState } from "react";

interface StateRadioButtonsProps {
  onStateChanged: (state: ProductState | null) => void;
  currentState: ProductState | null;
}

function StateRadioButtons({
  onStateChanged,
  currentState,
}: StateRadioButtonsProps) {
  return (
    <div>
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="condition"
          value={PRODUCT_STATE_CONFIG.totaly_new.value}
          className="form-radio accent-black"
          checked={PRODUCT_STATE_CONFIG.totaly_new.value === currentState}
          onChange={() => onStateChanged(PRODUCT_STATE_CONFIG.totaly_new.value)}
        />
        <span className="text-gray-900">
          {PRODUCT_STATE_CONFIG.totaly_new.label}
        </span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="condition"
          value={PRODUCT_STATE_CONFIG.used.value}
          className="form-radio accent-black"
          checked={PRODUCT_STATE_CONFIG.used.value === currentState}
          onChange={() => onStateChanged(PRODUCT_STATE_CONFIG.used.value)}
        />
        <span className="text-gray-900">{PRODUCT_STATE_CONFIG.used.label}</span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="condition"
          value={PRODUCT_STATE_CONFIG.refurbished.value}
          className="form-radio accent-black"
          checked={PRODUCT_STATE_CONFIG.refurbished.value === currentState}
          onChange={() =>
            onStateChanged(PRODUCT_STATE_CONFIG.refurbished.value)
          }
        />
        <span className="text-gray-900">
          {PRODUCT_STATE_CONFIG.refurbished.label}
        </span>
      </label>
    </div>
  );
}

interface ProductsFilterProps {
  className?: string;
  minPriceChanged?: (minPrice: string | null) => void;
  maxPriceChanged?: (maxPrice: string | null) => void;
  onStateChanged?: (state: ProductState | null) => void;
}

export default function ProductsFilter({
  className,
  onStateChanged,
  minPriceChanged,
  maxPriceChanged,
}: ProductsFilterProps) {
  const [currentState, setCurrentState] = useState<ProductState | null>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const handleClear = () => {
    setCurrentState(null);
    setMinPrice("");
    setMaxPrice("");
    onStateChanged?.(null);
    minPriceChanged?.(null);
    maxPriceChanged?.(null);
  };

  return (
    <aside className={cn("w-[270px]", className)}>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-5"> Filters</h2>
        <button
          className="underline -mt-4"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold">Condition</h2>
          <StateRadioButtons
            currentState={currentState}
            onStateChanged={(state) => {
              setCurrentState(state);
              onStateChanged?.(state);
            }}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-bold">Category</h3>
          <Searchbar
            onSearch={() => {}}
            placeholder="Search..."
          />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-bold">Price</h3>
          <TextField
            label="Min"
            placeholder="Type minimum"
            value={minPrice}
            onChange={(e) => {
              const value = e.target.value;
              setMinPrice(value);
              minPriceChanged?.(value === "" ? null : value);
            }}
          />
          <TextField
            label="Max"
            placeholder="Type maximum"
            value={maxPrice}
            onChange={(e) => {
              const value = e.target.value;
              setMaxPrice(value);
              maxPriceChanged?.(value === "" ? null : value);
            }}
          />
        </div>
        <div>
          <Button variant="primary">
            <span>See Results </span> <FaArrowRightLong />
          </Button>
        </div>
      </form>
    </aside>
  );
}
