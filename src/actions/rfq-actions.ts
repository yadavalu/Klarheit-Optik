"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function submitRFQ(data: {
  productId: string;
  productName: string;
  priceEUR: number;
  companyName: string;
  contactEmail: string;
  message: string;
  quantity: number;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Authentication required");

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalAmount: data.priceEUR * data.quantity,
      currency: "EUR",
      status: "QUOTE_REQUESTED",
      shippingAddress: JSON.stringify({
        company: data.companyName,
        email: data.contactEmail,
      }),
      notes: `RFQ for ${data.quantity}× ${data.productName}.\n\nMessage: ${data.message}`,
      items: {
        create: [
          {
            productId: data.productId,
            quantity: data.quantity,
            priceEUR: data.priceEUR,
          },
        ],
      },
    },
  });

  return { success: true, orderId: order.id };
}
