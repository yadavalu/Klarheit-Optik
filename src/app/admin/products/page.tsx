import Link from "next/link";
import { prisma } from "@/lib/db";
import { Package, Plus, Edit2, Trash2 } from "lucide-react";
import { formatCurrency, parseJsonField } from "@/lib/utils";
import { AdminProductActions } from "@/components/AdminProductActions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Manager",
};

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search = (params.search as string) || "";

  const products = await prisma.product.findMany({
    where: search
      ? {
          OR: [
            { name: { contains: search } },
            { sku: { contains: search } },
          ],
        }
      : undefined,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-950 mb-1">
            Product Manager
          </h1>
          <p className="text-purple-700 text-sm">
            {products.length} products in catalog
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Search */}
      <form className="max-w-md">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search products by name or SKU..."
          className="input"
        />
      </form>

      {/* Products Table */}
      <div className="card overflow-hidden">
        <div className="table-container border-0 rounded-none">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const images = parseJsonField<string[]>(product.images, []);
                return (
                  <tr key={product.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cream-200 overflow-hidden shrink-0">
                          {images[0] ? (
                            <img
                              src={images[0]}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-4 h-4 text-navy-500" />
                            </div>
                          )}
                        </div>
                        <Link
                          href={`/products/${product.slug}`}
                          className="text-purple-950 text-sm font-medium hover:text-purple-600 transition-colors line-clamp-1"
                        >
                          {product.name}
                        </Link>
                      </div>
                    </td>
                    <td>
                      <span className="font-mono text-xs">{product.sku}</span>
                    </td>
                    <td>
                      <span className="badge-neutral text-xs">
                        {product.category.name}
                      </span>
                    </td>
                    <td>
                      <span className="text-purple-950 font-medium">
                        {formatCurrency(product.priceEUR, "EUR")}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`text-sm ${
                          product.stock > 10
                            ? "text-green-400"
                            : product.stock > 0
                            ? "text-amber-400"
                            : "text-red-400"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      {product.isRFQOnly ? (
                        <span className="badge-rfq text-[10px]">RFQ</span>
                      ) : (
                        <span className="badge-success text-[10px]">Direct</span>
                      )}
                    </td>
                    <td>
                      <AdminProductActions productId={product.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
