"use client";

import { useCartStore } from "@/store";
import { ProductType } from "@/types/Product";

type AddCartProps = {
  product: ProductType;
};

const AddCart = ({ product }: AddCartProps) => {
  const useCart = useCartStore();

  return (
    <button
      className="w-full rounded-md bg-teal-600 text-center text-white px-3.5 py-2.5 text-sm"
      onClick={() => useCart.addToCart(product)}
    >
      Adicionar ao carrinho
    </button>
  );
};
export default AddCart;
