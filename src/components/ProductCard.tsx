"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, FileText, Tag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency, parseJsonField } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    sku: string;
    priceEUR: number;
    stock: number;
    isRFQOnly: boolean;
    images: string;
    description: string;
    category: { name: string; slug: string };
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, currency, setIsOpen } = useCartStore();
  const images = parseJsonField<string[]>(product.images, []);
  const image = images[0] || "";

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      priceEUR: product.priceEUR,
      image,
      sku: product.sku,
    });
    setIsOpen(true);
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="glass-card overflow-hidden">
          {/* Image */}
          <div className="relative aspect-[4/3] bg-white overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-navy-600">
                <Tag className="w-12 h-12" />
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-cream-100/60 via-transparent to-transparent" />

            {/* Category badge */}
            <span className="absolute top-3 left-3 badge-neutral text-[10px]">
              {product.category.name}
            </span>

            {/* RFQ Badge */}
            {product.isRFQOnly && (
              <span className="absolute top-3 right-3 badge-rfq text-[10px]">
                RFQ Only
              </span>
            )}

            {/* Quick action */}
            {!product.isRFQOnly && product.stock > 0 && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ scale: 1.05 }}
                className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-purple-600 text-purple-950 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4" />
              </motion.button>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <h3 className="text-sm font-semibold text-purple-950 group-hover:text-purple-600 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
            <p className="text-xs text-purple-600 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between pt-1">
              {product.isRFQOnly ? (
                <div className="flex items-center gap-1.5 text-amber-400">
                  <FileText className="w-3.5 h-3.5" />
                  <span className="text-sm font-semibold">Request Quote</span>
                </div>
              ) : (
                <span className="text-lg font-bold text-purple-950">
                  {formatCurrency(product.priceEUR, currency)}
                </span>
              )}
              {!product.isRFQOnly && (
                <span
                  className={`text-xs ${
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
                    ? `${product.stock} left`
                    : "Out of Stock"}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
