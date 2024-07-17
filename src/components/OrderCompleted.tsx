"use client";

import { useCartStore } from "@/store";
import { useEffect } from "react";

const OrderCompleted = () => {
  const useCart = useCartStore();

  useEffect(() => {
    useCart.setPaymentIntentId("");
    useCart.clearCart();
    useCart.setCheckout("cart");
  }, []);

  return (
    <div>
      <h1>Pedido concluído com sucesso</h1>
      <button
        className="bg-teal-600 text-white py-2 px-4 rounded-md mt-4"
        onClick={() => {
          useCart.toggleCart();
        }}
      >
        Voltar para a loja
      </button>
    </div>
  );
};
export default OrderCompleted;
