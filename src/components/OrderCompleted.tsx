"use client";

import { useCartStore } from "@/store";
import { useEffect } from "react";

const OrderCompleted = () => {
  const useCart = useCartStore();

  useEffect(() => {
    useCart.setPaymentIntentId("");
    useCart.clearCart();
  }, []);

  return (
    <div>
      <h1>Pedido concluído com sucesso</h1>
      <button
        className="bg-teal-600 text-white py-2 px-4 rounded-md"
        onClick={() => {
          useCart.setCheckout("cart");
          useCart.toggleCart();
        }}
      >
        Voltar para a loja
      </button>
    </div>
  );
};
export default OrderCompleted;
