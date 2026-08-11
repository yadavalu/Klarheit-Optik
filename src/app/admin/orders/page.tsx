import { prisma } from "@/lib/db";
import {
  DollarSign,
  FileText,
  Truck,
  Clock,
  XCircle,
} from "lucide-react";
import { AdminOrderActions } from "@/components/AdminOrderActions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders & RFQs",
};

const statusIcons: Record<string, React.ReactNode> = {
  PENDING: <Clock className="w-3.5 h-3.5" />,
  PAID: <DollarSign className="w-3.5 h-3.5" />,
  QUOTE_REQUESTED: <FileText className="w-3.5 h-3.5" />,
  SHIPPED: <Truck className="w-3.5 h-3.5" />,
  CANCELLED: <XCircle className="w-3.5 h-3.5" />,
};

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  PAID: "bg-green-500/10 border-green-500/30 text-green-400",
  QUOTE_REQUESTED: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  SHIPPED: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  CANCELLED: "bg-red-500/10 border-red-500/30 text-red-400",
};

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const status = (params.status as string) || undefined;

  const orders = await prisma.order.findMany({
    where: status ? { status } : undefined,
    include: {
      user: {
        select: { name: true, email: true, companyName: true },
      },
      items: {
        include: { product: { select: { name: true, sku: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const statuses = [
    "PENDING",
    "PAID",
    "QUOTE_REQUESTED",
    "SHIPPED",
    "CANCELLED",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-purple-950 mb-1">
          Orders & RFQ Manager
        </h1>
        <p className="text-purple-700 text-sm">
          {orders.length} order{orders.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        <a
          href="/admin/orders"
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            !status
              ? "bg-purple-600 text-purple-950"
              : "bg-white text-purple-700 border border-cream-300 hover:text-purple-950"
          }`}
        >
          All
        </a>
        {statuses.map((s) => (
          <a
            key={s}
            href={`/admin/orders?status=${s}`}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              status === s
                ? "bg-purple-600 text-purple-950"
                : "bg-white text-purple-700 border border-cream-300 hover:text-purple-950"
            }`}
          >
            {statusIcons[s]}
            {s.replace("_", " ")}
          </a>
        ))}
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden">
        <div className="table-container border-0 rounded-none">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Tracking</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <span className="font-mono text-xs text-purple-700">
                      {order.id.slice(0, 10)}...
                    </span>
                    {order.notes && (
                      <p className="text-xs text-amber-400/70 mt-1 max-w-[200px] truncate">
                        {order.notes}
                      </p>
                    )}
                  </td>
                  <td>
                    <div>
                      <p className="text-purple-950 text-sm">
                        {order.user.name || order.user.email}
                      </p>
                      {order.user.companyName && (
                        <p className="text-xs text-purple-600">
                          {order.user.companyName}
                        </p>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="space-y-0.5">
                      {order.items.slice(0, 2).map((item) => (
                        <p key={item.id} className="text-xs text-purple-700">
                          {item.quantity}× {item.product.name.slice(0, 30)}
                          {item.product.name.length > 30 ? "..." : ""}
                        </p>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-xs text-purple-600">
                          +{order.items.length - 2} more
                        </p>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="text-purple-950 font-medium">
                      €
                      {order.totalAmount.toLocaleString("de-DE", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                    <p className="text-xs text-purple-600">{order.currency}</p>
                  </td>
                  <td>
                    <span
                      className={`badge border ${statusColors[order.status] || ""}`}
                    >
                      {statusIcons[order.status]}
                      <span className="ml-1">
                        {order.status.replace("_", " ")}
                      </span>
                    </span>
                  </td>
                  <td>
                    <span className="text-xs text-purple-700 font-mono">
                      {order.trackingNumber || "—"}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs text-purple-600">
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </span>
                  </td>
                  <td>
                    <AdminOrderActions
                      orderId={order.id}
                      currentStatus={order.status}
                      trackingNumber={order.trackingNumber || ""}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
