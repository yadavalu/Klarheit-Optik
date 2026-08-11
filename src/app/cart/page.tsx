"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, currency, setCurrency } =
    useCartStore();

  const totalEUR = items.reduce((sum, i) => sum + i.priceEUR * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 text-center py-20">
          <ShoppingBag className="w-16 h-16 text-navy-600 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-purple-950 mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-purple-700 mb-8">
            Add some precision optical components to get started
          </p>
          <Link href="/products" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-purple-950 mb-2">Shopping Cart</h1>
        <p className="text-purple-700 mb-8">
          {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.productId}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="card p-5 flex gap-5"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl bg-cream-200 overflow-hidden shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-navy-500" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-purple-950 font-medium hover:text-purple-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-purple-600 font-mono mt-1">
                      SKU: {item.sku}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-0 bg-cream-200 rounded-lg border border-cream-400">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="p-2 text-purple-700 hover:text-purple-950 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm text-purple-950 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="p-2 text-purple-700 hover:text-purple-950 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-purple-950 font-semibold">
                          {formatCurrency(item.priceEUR * item.quantity, currency)}
                        </span>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-purple-600 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 space-y-5 sticky top-24">
              <h2 className="text-lg font-semibold text-purple-950">
                Order Summary
              </h2>

              {/* Currency */}
              <div>
                <label className="input-label">Currency</label>
                <div className="flex rounded-lg overflow-hidden border border-cream-300">
                  {["EUR", "USD"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`flex-1 py-2 text-sm font-medium transition-colors ${
                        currency === c
                          ? "bg-purple-600 text-purple-950"
                          : "bg-white text-purple-700 hover:text-purple-950"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-700">Subtotal</span>
                  <span className="text-purple-950">
                    {formatCurrency(totalEUR, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-purple-700">Shipping</span>
                  <span className="text-green-400">
                    {totalEUR > 500 ? "Free" : formatCurrency(45, currency)}
                  </span>
                </div>
                <div className="border-t border-cream-300/50 pt-3 flex justify-between">
                  <span className="text-purple-950 font-medium">Total</span>
                  <span className="text-xl font-bold text-purple-950">
                    {formatCurrency(
                      totalEUR + (totalEUR > 500 ? 0 : 45),
                      currency
                    )}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/products"
                className="btn-ghost w-full text-center block text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
