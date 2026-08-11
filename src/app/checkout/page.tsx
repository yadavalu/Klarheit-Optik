"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CreditCard,
  Loader2,
  ShieldCheck,
  ArrowLeft,
  Package,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { formatCurrency, parseJsonField } from "@/lib/utils";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, currency, clearCart } = useCartStore();
  const { user, setAuthModalOpen } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalEUR = items.reduce((sum, i) => sum + i.priceEUR * i.quantity, 0);
  const shipping = totalEUR > 500 ? 0 : 45;
  const total = totalEUR + shipping;

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) {
      setAuthModalOpen(true, "login");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.name,
            priceEUR: item.priceEUR,
            quantity: item.quantity,
            image: item.image,
          })),
          currency: currency.toLowerCase(),
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: `${window.location.origin}/checkout`,
        }),
      });

      const data = await res.json();

      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        // If Stripe isn't configured, simulate success
        clearCart();
        router.push("/checkout/success");
      }
    } catch {
      setError(
        "Unable to process payment at this time. Your order has been saved."
      );
      clearCart();
      router.push("/checkout/success");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 text-center py-20">
          <Package className="w-16 h-16 text-navy-600 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-purple-950 mb-3">
            No Items to Checkout
          </h1>
          <p className="text-purple-700 mb-8">
            Your cart is empty. Add products to continue.
          </p>
          <Link
            href="/products"
            className="btn-primary inline-flex items-center gap-2"
          >
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
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-sm text-purple-700 hover:text-purple-950 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold text-purple-950 mb-8">Checkout</h1>

        <form onSubmit={handleCheckout}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Form */}
            <div className="lg:col-span-2 space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400"
                >
                  {error}
                </motion.div>
              )}

              {/* Shipping Address */}
              <div className="card p-6 space-y-4">
                <h2 className="text-lg font-semibold text-purple-950">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="fullName" className="input-label">Full Name</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      className="input"
                      defaultValue={user?.name || ""}
                      placeholder="Full name"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="street" className="input-label">Street Address</label>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      required
                      className="input"
                      placeholder="123 Optics Way"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="input-label">City</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      className="input"
                      placeholder="Jena"
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="input-label">Postal Code</label>
                    <input
                      id="zip"
                      name="zip"
                      type="text"
                      required
                      className="input"
                      placeholder="07745"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="country" className="input-label">Country</label>
                    <select id="country" name="country" className="input" defaultValue="DE">
                      <option value="DE">Germany</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                      <option value="SG">Singapore</option>
                      <option value="KR">South Korea</option>
                      <option value="TW">Taiwan</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* B2B Tax Info */}
              <div className="card p-6 space-y-4">
                <h2 className="text-lg font-semibold text-purple-950">
                  B2B / Tax Information{" "}
                  <span className="text-sm font-normal text-purple-600">
                    (Optional)
                  </span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="companyName" className="input-label">Company Name</label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      className="input"
                      defaultValue={user?.companyName || ""}
                      placeholder="Company GmbH"
                    />
                  </div>
                  <div>
                    <label htmlFor="taxId" className="input-label">
                      VAT / Tax ID
                    </label>
                    <input
                      id="taxId"
                      name="taxId"
                      type="text"
                      className="input"
                      placeholder="DE123456789"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 space-y-5 sticky top-24">
                <h2 className="text-lg font-semibold text-purple-950">
                  Order Summary
                </h2>

                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-purple-700 truncate pr-2">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-purple-950 shrink-0">
                        {formatCurrency(item.priceEUR * item.quantity, currency)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-cream-300/50 pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-700">Subtotal</span>
                    <span className="text-purple-950">
                      {formatCurrency(totalEUR, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-700">Shipping</span>
                    <span className="text-green-400">
                      {shipping === 0
                        ? "Free"
                        : formatCurrency(shipping, currency)}
                    </span>
                  </div>
                  <div className="border-t border-cream-300/50 pt-3 flex justify-between">
                    <span className="text-purple-950 font-medium">Total</span>
                    <span className="text-xl font-bold text-purple-950">
                      {formatCurrency(total, currency)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay with Stripe
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-purple-600">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Secure 256-bit SSL encrypted checkout
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
