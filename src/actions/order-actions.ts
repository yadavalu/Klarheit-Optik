"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function createOrder(data: {
  items: { productId: string; quantity: number; priceEUR: number }[];
  totalAmount: number;
  currency: string;
  shippingAddress: string;
  stripeSessionId?: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Authentication required");

  return prisma.order.create({
    data: {
      userId: user.id,
      totalAmount: data.totalAmount,
      currency: data.currency,
      status: data.stripeSessionId ? "PAID" : "PENDING",
      shippingAddress: data.shippingAddress,
      stripeSessionId: data.stripeSessionId,
      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          priceEUR: item.priceEUR,
        })),
      },
    },
    include: { items: { include: { product: true } } },
  });
}

export async function getOrders(params?: {
  status?: string;
  userId?: string;
  page?: number;
  limit?: number;
}) {
  const { status, userId, page = 1, limit = 20 } = params || {};

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (userId) where.userId = userId;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        user: { select: { id: true, email: true, name: true, companyName: true } },
        items: { include: { product: { select: { name: true, sku: true } } } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.order.count({ where }),
  ]);

  return { orders, total, pages: Math.ceil(total / limit), page };
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
  trackingNumber?: string
) {
  return prisma.order.update({
    where: { id: orderId },
    data: {
      status,
      ...(trackingNumber ? { trackingNumber } : {}),
    },
  });
}

export async function getOrderStats() {
  const [totalOrders, totalRevenue, statusCounts, rfqCount] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { totalAmount: true } }),
    prisma.order.groupBy({
      by: ["status"],
      _count: true,
    }),
    prisma.order.count({ where: { status: "QUOTE_REQUESTED" } }),
  ]);

  const categorySales = await prisma.orderItem.groupBy({
    by: ["productId"],
    _sum: { priceEUR: true },
    _count: true,
    orderBy: { _sum: { priceEUR: "desc" } },
    take: 5,
  });

  return {
    totalOrders,
    totalRevenue: totalRevenue._sum.totalAmount || 0,
    statusCounts: statusCounts.reduce(
      (acc, s) => ({ ...acc, [s.status]: s._count }),
      {} as Record<string, number>
    ),
    rfqCount,
    topProducts: categorySales,
  };
}
