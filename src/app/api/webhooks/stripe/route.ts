import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

async function handler(request: Request) {
  const body = await request.text();
  const sig = headers().get("stripe-signature") || "";

  if (!sig) {
    return NextResponse.json({ message: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.created":
      const payment_intent = event.data.object as Stripe.PaymentIntent;
      console.log("created");
      break;
    case "charge.succeeded":
      const charge = event.data.object as Stripe.Charge;
      if (typeof charge.payment_intent === "string") {
        const order = await prisma.order.update({
          where: {
            paymentIntentID: charge.payment_intent,
          },
          data: { status: "complete" },
        });
      }
      break;
    default:
      console.log(`Event type:  ${event.type}`);
  }

  return NextResponse.json({}, { status: 200 });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
