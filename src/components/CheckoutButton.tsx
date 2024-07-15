"use client";

import formatPrice from "@/lib/formatPrice";
import { useCartStore } from "@/store";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type CheckoutButtonProps = {
  totalPrice: number;
};

const CheckoutButton = ({ totalPrice }: CheckoutButtonProps) => {
  const { user } = useUser();
  const router = useRouter();

  const useCart = useCartStore();

  const handleCheckout = () => {
    if (!user) {
      router.push("/sign-in?redirectUrl=/");
      useCart.toggleCart();
      return;
    }

    useCart.setCheckout("checkout");
  };

  return (
    <div>
      <p className="text-teal-600 font-bold">
        Total: {formatPrice(totalPrice)}
      </p>

      <button
        className="w-full bg-teal-600 rounded-md py-2 text-white text-center mt-2"
        onClick={() => handleCheckout()}
      >
        Finalizar compra
      </button>
    </div>
  );
};
export default CheckoutButton;
