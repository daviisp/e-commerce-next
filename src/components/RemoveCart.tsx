"use client";

import { useCartStore } from "@/store";
import { ProductType } from "@/types/Product";
import { toast } from "./ui/use-toast";

type RemoveCartProps = {
  product: ProductType;
};

const RemoveCart = ({ product }: RemoveCartProps) => {
  const useCart = useCartStore();

  const handleRemove = () => {
    useCart.removeFromCart(product.id);

    const isProductInCart = useCartStore
      .getState()
      .cart.some((item) => item.id === product.id);

    if (!isProductInCart) {
      toast({
        variant: "destructive",
        title: "Produto removido com sucesso!",
      });
    }
  };

  return (
    <button
      className="py-1 px-2  text-gray-300 border rounded-md border-gray-300 text-sm"
      onClick={handleRemove}
    >
      Remover
    </button>
  );
};
export default RemoveCart;
