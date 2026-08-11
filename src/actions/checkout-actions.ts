"use server";

import { stripe } from "@/lib/stripe";
import { getCurrentUser } from "@/lib/auth";

export async function createStripeCheckoutSession(data: {
  items: {
    name: string;
    priceEUR: number;
    quantity: number;
    image?: string;
  }[];
  currency: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Authentication required");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: user.email,
    line_items: data.items.map((item) => ({
      price_data: {
        currency: data.currency.toLowerCase(),
        product_data: {
          name: item.name,
          ...(item.image ? { images: [item.image] } : {}),
        },
        unit_amount: Math.round(item.priceEUR * 100),
      },
      quantity: item.quantity,
    })),
    success_url: data.successUrl,
    cancel_url: data.cancelUrl,
    metadata: {
      userId: user.id,
    },
  });

  return { url: session.url, sessionId: session.id };
}
