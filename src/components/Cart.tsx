"use client";

import { useCartStore } from "@/store";
import CartDrawer from "./CartDrawer";

const Cart = () => {
  const useCart = useCartStore();

  return (
    <>
      <div
        className="cursor-pointer relative"
        onClick={() => useCart.toggleCart()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="absolute bg-teal-600 rounded-full font-bold flex items-center justify-center w-5 h-5 bottom-3.5 left-2">
          {useCart.cart.length}
        </span>
      </div>
      {!useCart.isOpen && <CartDrawer />}
    </>
  );
};
export default Cart;
