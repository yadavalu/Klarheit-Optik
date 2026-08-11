"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { submitRFQ } from "@/actions/rfq-actions";
import { formatCurrency } from "@/lib/utils";

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    priceEUR: number;
    sku: string;
  };
}

export function RFQModal({ isOpen, onClose, product }: RFQModalProps) {
  const { user, setAuthModalOpen } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) {
      setAuthModalOpen(true, "login");
      return;
    }

    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    try {
      await submitRFQ({
        productId: product.id,
        productName: product.name,
        priceEUR: product.priceEUR,
        companyName: form.get("companyName") as string,
        contactEmail: form.get("contactEmail") as string,
        message: form.get("message") as string,
        quantity: Number(form.get("quantity")) || 1,
      });
      setSuccess(true);
    } catch {
      setError("Failed to submit quote request. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overlay"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="w-full max-w-lg glass-card p-0 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-cream-300/50">
                <div>
                  <h2 className="text-lg font-semibold text-purple-950">
                    Request B2B Export Quote
                  </h2>
                  <p className="text-xs text-purple-700 mt-1">
                    {product.name} • SKU: {product.sku}
                  </p>
                </div>
                <button onClick={onClose} className="btn-ghost p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {success ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-purple-950 mb-2">
                    Quote Request Submitted
                  </h3>
                  <p className="text-sm text-purple-700 mb-6">
                    Our sales team will review your request and respond within
                    1-2 business days.
                  </p>
                  <button onClick={onClose} className="btn-primary">
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                      {error}
                    </div>
                  )}

                  <div className="p-3 rounded-lg bg-white border border-cream-300">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-700">List Price (EUR)</span>
                      <span className="text-purple-950 font-medium">
                        {formatCurrency(product.priceEUR, "EUR")}
                      </span>
                    </div>
                    <p className="text-xs text-purple-600 mt-1">
                      Final pricing will be provided in the quote
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="rfq-quantity" className="input-label">Quantity</label>
                      <input
                        id="rfq-quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        defaultValue="1"
                        required
                        className="input"
                      />
                    </div>
                    <div>
                      <label htmlFor="rfq-company" className="input-label">Company</label>
                      <input
                        id="rfq-company"
                        name="companyName"
                        type="text"
                        required
                        className="input"
                        defaultValue={user?.companyName || ""}
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="rfq-email" className="input-label">Contact Email</label>
                    <input
                      id="rfq-email"
                      name="contactEmail"
                      type="email"
                      required
                      className="input"
                      defaultValue={user?.email || ""}
                      placeholder="purchasing@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="rfq-message" className="input-label">
                      Requirements & Notes
                    </label>
                    <textarea
                      id="rfq-message"
                      name="message"
                      rows={3}
                      required
                      className="input resize-none"
                      placeholder="Delivery timeline, custom specifications, volume requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Quote Request
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
