"use client";

import formatPrice from "@/lib/formatPrice";
import { useCartStore } from "@/store";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const useCart = useCartStore();

  const totalPrice = useCart.cart.reduce((acc, item) => {
    return acc + item.quantity! * item.price!;
  }, 0);

  const formattedPrice = formatPrice(totalPrice);

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;
  }, [stripe, clientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          useCart.setCheckout("success");
        }
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <h1 className="py-4 font-bold">Total: {formattedPrice}</h1>
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="bg-teal-600 text-white py-2 px-4 rounded-md"
      >
        {isLoading ? "Carregando..." : "Finalizar compra"}
      </button>
    </form>
  );
};
export default CheckoutForm;
