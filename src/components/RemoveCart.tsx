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
    try {
      useCart.removeFromCart(product.id);

      const productInCart = useCartStore
        .getState()
        .cart.find((item) => item.id === product.id);

      if (!productInCart) {
        toast({
          title: "Produto removido com sucesso!",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Erro. Tente novamente",
        variant: "destructive",
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
