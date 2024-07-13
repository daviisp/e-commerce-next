"use client";

import { ProductType } from "@/types/Product";
import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
  product: ProductType;
  fill?: boolean;
};

const ProductImage = ({ product, fill }: ProductImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return fill ? (
    <Image
      src={product.image}
      alt={product.name}
      fill
      className={` ${
        isLoading ? "blur-xl scale-110" : ""
      } object-cover bg-center rounded-md`}
      onLoad={() => setIsLoading(false)}
    />
  ) : (
    <Image
      src={product.image}
      alt={product.name}
      width={400}
      height={700}
      className={` ${
        isLoading ? "blur-xl scale-110" : ""
      } object-cover bg-center rounded-md`}
      onLoad={() => setIsLoading(false)}
    />
  );
};
export default ProductImage;
