import {
  DollarSign,
  ShoppingCart,
  Package,
  FileText,
  Truck,
  Clock,
  XCircle,
} from "lucide-react";
import { getOrderStats } from "@/actions/order-actions";
import { prisma } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const statusIcons: Record<string, React.ReactNode> = {
  PENDING: <Clock className="w-4 h-4 text-amber-400" />,
  PAID: <DollarSign className="w-4 h-4 text-green-400" />,
  QUOTE_REQUESTED: <FileText className="w-4 h-4 text-blue-400" />,
  SHIPPED: <Truck className="w-4 h-4 text-purple-400" />,
  CANCELLED: <XCircle className="w-4 h-4 text-red-400" />,
};

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  PAID: "bg-green-500/10 border-green-500/30 text-green-400",
  QUOTE_REQUESTED: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  SHIPPED: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  CANCELLED: "bg-red-500/10 border-red-500/30 text-red-400",
};

export default async function AdminDashboard() {
  const stats = await getOrderStats();
  const totalProducts = await prisma.product.count();
  const totalUsers = await prisma.user.count();

  const recentOrders = await prisma.order.findMany({
    include: {
      user: { select: { name: true, email: true } },
      items: { include: { product: { select: { name: true } } } },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-purple-950 mb-1">Dashboard</h1>
        <p className="text-purple-700 text-sm">
          Overview of your optical products platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm text-purple-700">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold text-purple-950">
            €{stats.totalRevenue.toLocaleString("de-DE", { minimumFractionDigits: 0 })}
          </p>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-600/30 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-purple-700">Total Orders</span>
          </div>
          <p className="text-2xl font-bold text-purple-950">{stats.totalOrders}</p>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-sm text-purple-700">Active RFQs</span>
          </div>
          <p className="text-2xl font-bold text-purple-950">{stats.rfqCount}</p>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm text-purple-700">Products</span>
          </div>
          <p className="text-2xl font-bold text-purple-950">{totalProducts}</p>
          <p className="text-xs text-purple-600 mt-1">{totalUsers} registered users</p>
        </div>
      </div>

      {/* Order Status Overview */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-purple-950 mb-4">
          Order Status Breakdown
        </h2>
        <div className="flex flex-wrap gap-3">
          {Object.entries(stats.statusCounts).map(([status, count]) => (
            <div
              key={status}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${statusColors[status] || "bg-white border-cream-300 text-purple-700"}`}
            >
              {statusIcons[status]}
              <span className="text-sm font-medium">
                {status.replace("_", " ")}
              </span>
              <span className="text-lg font-bold ml-1">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-cream-300/50">
          <h2 className="text-lg font-semibold text-purple-950">Recent Orders</h2>
        </div>
        <div className="table-container border-0 rounded-none">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <span className="font-mono text-xs text-purple-700">
                      {order.id.slice(0, 8)}...
                    </span>
                  </td>
                  <td>
                    <p className="text-purple-950 text-sm">
                      {order.user.name || order.user.email}
                    </p>
                    <p className="text-xs text-purple-600">{order.user.email}</p>
                  </td>
                  <td>
                    <span className="text-sm">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </span>
                  </td>
                  <td>
                    <span className="text-purple-950 font-medium">
                      €{order.totalAmount.toLocaleString("de-DE", { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge border ${statusColors[order.status] || "bg-white text-purple-700 border-cream-300"}`}
                    >
                      {statusIcons[order.status]}
                      <span className="ml-1">
                        {order.status.replace("_", " ")}
                      </span>
                    </span>
                  </td>
                  <td>
                    <span className="text-xs text-purple-600">
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </span>
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
