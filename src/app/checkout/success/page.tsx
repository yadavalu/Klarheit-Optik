import Link from "next/link";
import { CheckCircle, ArrowRight, Package } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>

        <h1 className="text-3xl font-bold text-purple-950 mb-4">
          Order Confirmed!
        </h1>

        <p className="text-purple-800 mb-8 leading-relaxed">
          Thank you for your purchase. A confirmation email has been sent to
          your inbox. Your optical components will be carefully packaged and
          shipped with full documentation including Certificate of Analysis.
        </p>

        <div className="card p-5 mb-8 text-left space-y-3">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-purple-800">
              Expected shipping: 3-5 business days (EU) / 5-10 business days
              (International)
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="btn-primary flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/" className="btn-secondary text-center">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
