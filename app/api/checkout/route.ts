import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { stock, quantity } = await req.json();
  console.log(
    stock?.price,
    stock.price * quantity,
    "stock.price * quantity",
    Math.round(stock.price * quantity),
  );
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${stock.name} (${stock.symbol})`,
          },
          unit_amount: Math.round(stock.price * quantity * 100), // cents
        },
        quantity,
      },
    ],

    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/markets?stock=${encodeURIComponent(JSON.stringify({ ...stock, quantity: quantity }))}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/markets`,
  });

  return NextResponse.json({ url: session.url });
}
