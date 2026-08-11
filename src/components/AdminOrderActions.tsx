"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check } from "lucide-react";
import { updateOrderStatus } from "@/actions/order-actions";

interface AdminOrderActionsProps {
  orderId: string;
  currentStatus: string;
  trackingNumber: string;
}

const nextStatuses: Record<string, string[]> = {
  PENDING: ["PAID", "CANCELLED"],
  PAID: ["SHIPPED", "CANCELLED"],
  QUOTE_REQUESTED: ["PAID", "CANCELLED"],
  SHIPPED: [],
  CANCELLED: [],
};

export function AdminOrderActions({
  orderId,
  currentStatus,
  trackingNumber: initialTracking,
}: AdminOrderActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tracking, setTracking] = useState(initialTracking);
  const [showTracking, setShowTracking] = useState(false);

  const available = nextStatuses[currentStatus] || [];

  async function handleStatusUpdate(newStatus: string) {
    setLoading(true);
    try {
      await updateOrderStatus(
        orderId,
        newStatus,
        newStatus === "SHIPPED" ? tracking : undefined
      );
      router.refresh();
    } catch (err) {
      console.error("Status update failed:", err);
    } finally {
      setLoading(false);
    }
  }

  if (available.length === 0) return <span className="text-xs text-purple-600">—</span>;

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
      ) : (
        <>
          {available.includes("SHIPPED") && (
            <div className="flex items-center gap-1">
              {showTracking ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tracking}
                    onChange={(e) => setTracking(e.target.value)}
                    placeholder="Tracking #"
                    className="input py-1 px-2 text-xs w-28"
                  />
                  <button
                    onClick={() => handleStatusUpdate("SHIPPED")}
                    className="p-1 text-green-400 hover:text-green-300"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowTracking(true)}
                  className="px-2 py-1 text-xs font-medium rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500/20 transition-colors"
                >
                  Ship
                </button>
              )}
            </div>
          )}
          {available.includes("PAID") && (
            <button
              onClick={() => handleStatusUpdate("PAID")}
              className="px-2 py-1 text-xs font-medium rounded bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-colors"
            >
              {currentStatus === "QUOTE_REQUESTED" ? "Convert to Invoice" : "Mark Paid"}
            </button>
          )}
          {available.includes("CANCELLED") && (
            <button
              onClick={() => handleStatusUpdate("CANCELLED")}
              className="px-2 py-1 text-xs font-medium rounded bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors"
            >
              Cancel
            </button>
          )}
        </>
      )}
    </div>
  );
}
