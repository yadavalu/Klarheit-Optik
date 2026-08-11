"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  FileText,
  ChevronRight,
  Minus,
  Plus,
  Package,
  ShieldCheck,
} from "lucide-react";
import { ImageGallery } from "./ImageGallery";
import { SpecTable } from "./SpecTable";
import { RFQModal } from "./RFQModal";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency, parseJsonField } from "@/lib/utils";

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    slug: string;
    sku: string;
    priceEUR: number;
    stock: number;
    isRFQOnly: boolean;
    technicalSpecs: string;
    images: string;
    description: string;
    category: { name: string; slug: string };
  };
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [rfqOpen, setRfqOpen] = useState(false);
  const { addItem, currency, setIsOpen } = useCartStore();

  const images = parseJsonField<string[]>(product.images, []);
  const specs = parseJsonField<Record<string, string>>(
    product.technicalSpecs,
    {}
  );

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        priceEUR: product.priceEUR,
        image: images[0] || "",
        sku: product.sku,
      });
    }
    setIsOpen(true);
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-purple-600 mb-8">
        <Link
          href="/products"
          className="hover:text-purple-950 transition-colors"
        >
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/products?category=${product.category.slug}`}
          className="hover:text-purple-950 transition-colors"
        >
          {product.category.name}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-purple-800 truncate">{product.name}</span>
      </nav>

      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left - Image Gallery */}
        <div>
          <ImageGallery images={images} productName={product.name} />
        </div>

        {/* Right - Product Info */}
        <div className="space-y-6">
          {/* Category & SKU */}
          <div className="flex items-center gap-3">
            <span className="badge-neutral">{product.category.name}</span>
            {product.isRFQOnly && <span className="badge-rfq">B2B / RFQ Only</span>}
          </div>

          {/* Name */}
          <h1 className="text-3xl font-bold text-purple-950">{product.name}</h1>

          {/* SKU */}
          <p className="text-sm text-purple-600 font-mono">SKU: {product.sku}</p>

          {/* Description */}
          <p className="text-purple-800 leading-relaxed">{product.description}</p>

          {/* Price & Actions */}
          <div className="card p-6 space-y-5">
            {product.isRFQOnly ? (
              <>
                <div>
                  <p className="text-sm text-purple-700 mb-1">List Price</p>
                  <p className="text-3xl font-bold text-purple-950">
                    {formatCurrency(product.priceEUR, currency)}
                  </p>
                  <p className="text-xs text-amber-400 mt-1">
                    Custom pricing available on request
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setRfqOpen(true)}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg bg-amber-600 hover:bg-amber-700 shadow-amber-600/20 hover:shadow-amber-600/30"
                >
                  <FileText className="w-5 h-5" />
                  Request B2B Export Quote
                </motion.button>
              </>
            ) : (
              <>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-purple-700 mb-1">Price</p>
                    <p className="text-3xl font-bold text-purple-950">
                      {formatCurrency(product.priceEUR, currency)}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      product.stock > 10
                        ? "text-green-400"
                        : product.stock > 0
                        ? "text-amber-400"
                        : "text-red-400"
                    }`}
                  >
                    {product.stock > 10
                      ? "In Stock"
                      : product.stock > 0
                      ? `Only ${product.stock} left`
                      : "Out of Stock"}
                  </span>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-purple-700">Quantity:</span>
                  <div className="flex items-center gap-0 bg-cream-200 rounded-xl border border-cream-400">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-purple-700 hover:text-purple-950 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-purple-950 font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="p-3 text-purple-700 hover:text-purple-950 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </motion.button>
              </>
            )}

            {/* Trust badges */}
            <div className="flex items-center gap-4 pt-4 border-t border-cream-300/50">
              <div className="flex items-center gap-1.5 text-xs text-purple-600">
                <Package className="w-3.5 h-3.5" />
                Free shipping over €500
              </div>
              <div className="flex items-center gap-1.5 text-xs text-purple-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                CoA included
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specs */}
      {Object.keys(specs).length > 0 && (
        <div className="mt-12">
          <SpecTable specs={specs} />
        </div>
      )}

      {/* RFQ Modal */}
      <RFQModal
        isOpen={rfqOpen}
        onClose={() => setRfqOpen(false)}
        product={{
          id: product.id,
          name: product.name,
          priceEUR: product.priceEUR,
          sku: product.sku,
        }}
      />
    </>
  );
}
