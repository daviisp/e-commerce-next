import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "./types/Product";

type CartState = {
  //   addToCart: (product: ProductType) => void;
  //   removeFromCart: (productId: number) => void;
  isOpen: boolean;
  toggleCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: "cart-storage" }
  )
);
