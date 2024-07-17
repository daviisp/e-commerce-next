import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "./types/Product";

type CartState = {
  cart: ProductType[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: string) => void;
  isOpen: boolean;
  toggleCart: () => void;
  onCheckout: string;
  setCheckout: (checkout: string) => void;
  paymentIntentId: string;
  setPaymentIntentId: (paymentIntentId: string) => void;
  clearCart: () => void;
  itemRemovedCompleted: boolean;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addToCart: (product) =>
        set((state) => {
          const productIndex = state.cart.findIndex((p) => p.id === product.id);

          if (productIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[productIndex].quantity!++;
            return { cart: updatedCart };
          } else {
            const updatedCart = [...state.cart, { ...product, quantity: 1 }];
            return { cart: updatedCart };
          }
        }),
      itemRemovedCompleted: false,
      removeFromCart: (productId) =>
        set((state) => {
          const productIndex = state.cart.findIndex((p) => p.id === productId);

          if (productIndex !== -1) {
            const updatedCart = [...state.cart];
            if (updatedCart[productIndex].quantity! > 1) {
              updatedCart[productIndex].quantity!--;
              return { cart: updatedCart };
            } else {
              const filteredCart = state.cart.filter((p) => p.id !== productId);
              return { cart: filteredCart };
            }
          }
          return state;
        }),
      onCheckout: "cart",
      setCheckout: (checkout) => set(() => ({ onCheckout: checkout })),
      paymentIntentId: "",
      setPaymentIntentId: (paymentIntentId) => set(() => ({ paymentIntentId })),
      clearCart: () => set(() => ({ cart: [] })),
    }),
    { name: "cart-storage" }
  )
);
