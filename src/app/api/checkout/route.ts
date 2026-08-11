import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, currency, successUrl, cancelUrl } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: user.email,
      line_items: items.map(
        (item: {
          name: string;
          priceEUR: number;
          quantity: number;
          image?: string;
        }) => ({
          price_data: {
            currency: (currency || "eur").toLowerCase(),
            product_data: {
              name: item.name,
              ...(item.image ? { images: [item.image] } : {}),
            },
            unit_amount: Math.round(item.priceEUR * 100),
          },
          quantity: item.quantity,
        })
      ),
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { userId: user.id },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
