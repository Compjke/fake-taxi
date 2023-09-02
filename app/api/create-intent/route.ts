import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: "2023-08-16",
  });
  const data = await req.json();
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(data.amount),
      currency: "USD",
    });

    return NextResponse.json(paymentIntent.client_secret, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err }, { status: 400 });
  }
}
