"use client";

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";

const Checkout = () => {
  const useCart = useCartStore();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: useCart.cart,
        payment_intent_id: useCart.paymentIntentId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        useCart.setPaymentIntentId(data.paymentIntent.id);
        setClientSecret(data.paymentIntent.client_secret);
      });
  }, [useCart.cart]);

  return (
    <div>
      <h1>Checkout</h1>
    </div>
  );
};
export default Checkout;
