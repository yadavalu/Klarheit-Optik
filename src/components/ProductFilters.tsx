"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface ProductFiltersProps {
  categories: { slug: string; name: string; _count: { products: number } }[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [showFilters, setShowFilters] = useState(false);

  const currentCategory = searchParams.get("category") || "";
  const currentSearch = searchParams.get("search") || "";
  const currentRfq = searchParams.get("rfq") || "";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  }

  function clearAllFilters() {
    startTransition(() => {
      router.push("/products");
    });
  }

  const hasFilters = currentCategory || currentSearch || currentRfq;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-600" />
          <input
            type="text"
            placeholder="Search optics, lenses, filters..."
            defaultValue={currentSearch}
            onChange={(e) => {
              const timeout = setTimeout(
                () => updateParams("search", e.target.value),
                400
              );
              return () => clearTimeout(timeout);
            }}
            className="input pl-10"
            id="product-search"
          />
          {isPending && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`btn-secondary flex items-center gap-2 md:hidden ${
            showFilters ? "bg-cream-300" : ""
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Filter Pills (always visible) */}
      {hasFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-purple-600">Active filters:</span>
          {currentCategory && (
            <button
              onClick={() => updateParams("category", "")}
              className="badge-info flex items-center gap-1"
            >
              {categories.find((c) => c.slug === currentCategory)?.name || currentCategory}
              <X className="w-3 h-3" />
            </button>
          )}
          {currentSearch && (
            <button
              onClick={() => updateParams("search", "")}
              className="badge-info flex items-center gap-1"
            >
              &ldquo;{currentSearch}&rdquo;
              <X className="w-3 h-3" />
            </button>
          )}
          {currentRfq && (
            <button
              onClick={() => updateParams("rfq", "")}
              className="badge-rfq flex items-center gap-1"
            >
              RFQ Only
              <X className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={clearAllFilters}
            className="text-xs text-red-400 hover:text-red-300 ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Sidebar Filters */}
      <div className={`space-y-6 ${showFilters ? "block" : "hidden md:block"}`}>
        {/* Categories */}
        <div>
          <h4 className="text-xs font-semibold text-purple-800 uppercase tracking-wider mb-3">
            Category
          </h4>
          <div className="space-y-1.5">
            <button
              onClick={() => updateParams("category", "")}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                !currentCategory
                  ? "bg-purple-600/15 text-purple-600 border border-purple-600/30"
                  : "text-purple-700 hover:text-purple-950 hover:bg-cream-200/60"
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => updateParams("category", cat.slug)}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                  currentCategory === cat.slug
                    ? "bg-purple-600/15 text-purple-600 border border-purple-600/30"
                    : "text-purple-700 hover:text-purple-950 hover:bg-cream-200/60"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-xs text-purple-600">
                  {cat._count.products}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* RFQ Toggle */}
        <div>
          <h4 className="text-xs font-semibold text-purple-800 uppercase tracking-wider mb-3">
            Purchase Type
          </h4>
          <div className="space-y-1.5">
            <button
              onClick={() => updateParams("rfq", "")}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                !currentRfq
                  ? "bg-purple-600/15 text-purple-600 border border-purple-600/30"
                  : "text-purple-700 hover:text-purple-950 hover:bg-cream-200/60"
              }`}
            >
              All
            </button>
            <button
              onClick={() => updateParams("rfq", "true")}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                currentRfq === "true"
                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                  : "text-purple-700 hover:text-purple-950 hover:bg-cream-200/60"
              }`}
            >
              B2B / RFQ Only
            </button>
            <button
              onClick={() => updateParams("rfq", "false")}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                currentRfq === "false"
                  ? "bg-green-500/15 text-green-400 border border-green-500/30"
                  : "text-purple-700 hover:text-purple-950 hover:bg-cream-200/60"
              }`}
            >
              Direct Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
