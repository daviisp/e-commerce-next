"use client";

import { useCartStore } from "@/store";
import { ProductType } from "@/types/Product";
import { useToast } from "@/components/ui/use-toast";

type AddCartProps = {
  product: ProductType;
};

const AddCart = ({ product }: AddCartProps) => {
  const useCart = useCartStore();

  const { toast } = useToast();

  return (
    <button
      className="w-full rounded-md bg-teal-600 text-center text-white px-3.5 py-2.5 text-sm"
      onClick={() => {
        toast({
          variant: "success",
          title: "Produto adicionado com sucesso!",
        });
        useCart.addToCart(product);
      }}
    >
      Adicionar ao carrinho
    </button>
  );
};
export default AddCart;
