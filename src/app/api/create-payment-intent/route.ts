import stripe from "@/lib/stripe";
import { ProductType } from "@/types/Product";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function calculateOrderAmount(items: ProductType[]) {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.quantity! * item.price!;
  }, 0);

  return totalPrice;
}

export async function POST(request: Request) {
  const { items, payment_intent_id } = await request.json();
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({}, { status: 400 });
  }

  const total = calculateOrderAmount(items);

  const orderData = {
    user: { connect: { externalId: userId } },
    amount: total,
    currency: "brl",
    status: "pending",
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map((product: ProductType) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        image: product.image,
      })),
    },
  };

  if (payment_intent_id) {
    const current_payment = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (current_payment) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: total,
        }
      );

      const [existingOrder, updatedOrder] = await Promise.all([
        prisma.order.findFirst({
          where: {
            paymentIntentID: payment_intent_id,
          },
        }),

        prisma.order.update({
          where: {
            paymentIntentID: payment_intent_id,
          },
          data: {
            amount: total,
            products: {
              deleteMany: {},
              create: items.map((item: ProductType) => ({
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                image: item.image,
              })),
            },
          },
        }),
      ]);

      if (!existingOrder) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
      }

      return NextResponse.json(
        { paymentIntent: updated_intent },
        { status: 200 }
      );
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "brl",
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentID = paymentIntent.id;

    await prisma.order.create({
      data: orderData,
    });

    return NextResponse.json({ paymentIntent: paymentIntent }, { status: 200 });
  }
}
