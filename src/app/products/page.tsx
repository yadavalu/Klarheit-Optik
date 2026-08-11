import { Suspense } from "react";
import { getProducts, getCategories } from "@/actions/product-actions";
import { ProductFilters } from "@/components/ProductFilters";
import { ProductGrid } from "@/components/ProductGrid";
import { SlidersHorizontal } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our complete catalog of precision optical systems, lithography equipment, photonic sensors, photography lenses, and optical filters.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const category = (params.category as string) || undefined;
  const search = (params.search as string) || undefined;
  const rfq = params.rfq as string | undefined;
  const page = Number(params.page) || 1;

  const [result, categories] = await Promise.all([
    getProducts({
      category,
      search,
      rfqOnly: rfq === "true" ? true : rfq === "false" ? false : undefined,
      page,
      limit: 12,
    }),
    getCategories(),
  ]);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-purple-600 text-sm mb-2">
            <SlidersHorizontal className="w-4 h-4" />
            <span>
              {result.total} product{result.total !== 1 ? "s" : ""} found
            </span>
          </div>
          <h1 className="text-3xl font-bold text-purple-950">Product Catalog</h1>
        </div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <Suspense fallback={<div className="animate-pulse h-64 bg-white rounded-xl" />}>
              <ProductFilters categories={categories} />
            </Suspense>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid products={result.products} />

            {/* Pagination */}
            {result.pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                {Array.from({ length: result.pages }, (_, i) => i + 1).map(
                  (p) => {
                    const params = new URLSearchParams();
                    if (category) params.set("category", category);
                    if (search) params.set("search", search);
                    if (rfq) params.set("rfq", rfq);
                    params.set("page", String(p));

                    return (
                      <a
                        key={p}
                        href={`/products?${params.toString()}`}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                          p === page
                            ? "bg-purple-600 text-purple-950"
                            : "bg-white text-purple-700 hover:bg-cream-200 hover:text-purple-950 border border-cream-300"
                        }`}
                      >
                        {p}
                      </a>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
