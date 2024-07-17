"use client";

import { useCartStore } from "@/store";
import Image from "next/image";
import CheckoutButton from "./CheckoutButton";
import Checkout from "./Checkout";
import OrderCompleted from "./OrderCompleted";

import { motion } from "framer-motion";

const CartDrawer = () => {
  const useCart = useCartStore();

  const totalPrice = useCart.cart.reduce((acc, item) => {
    return acc + item.price! * item.quantity!;
  }, 0);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed w-full h-screen bg-black/25 left-0 top-0 z-50"
        onClick={() => useCart.toggleCart()}
      >
        <div
          className="absolute top-0 right-0 w-1/3 h-screen p-8 rounded-md bg-slate-600 overflow-y-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          <h1
            onClick={() => useCart.toggleCart()}
            className="cursor-pointer text-teal-600 font-bold text-sm"
          >
            Voltar para a loja
          </h1>
          <div className="my-4 border-t border-t-gray-400" />

          {useCart.onCheckout === "cart" &&
            useCart.cart.map((item) => (
              <motion.div
                initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
                animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
                exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
                className="flex gap-4 py-4"
                key={item.id}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="rounded-md"
                />
                <div>
                  <h1>{item.name}</h1>
                  <p className="pb-4">Quantidade: {item.quantity}</p>

                  <button
                    className="py-1 px-2 text-gray-300 border rounded-md border-gray-300 mr-3 text-sm"
                    onClick={() => useCart.addToCart(item)}
                  >
                    Adicionar
                  </button>
                  <button
                    className="py-1 px-2  text-gray-300 border rounded-md border-gray-300 text-sm"
                    onClick={() => useCart.removeFromCart(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </motion.div>
            ))}

          {useCart.onCheckout === "cart" && useCart.cart.length > 1 && (
            <CheckoutButton totalPrice={totalPrice} />
          )}

          {useCart.onCheckout === "checkout" && <Checkout />}

          {useCart.onCheckout === "success" && <OrderCompleted />}
        </div>
      </motion.div>
    </>
  );
};
export default CartDrawer;
