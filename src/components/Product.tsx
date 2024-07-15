import { ProductType } from "@/types/Product";
import ProductImage from "./ProductImage";
import formatPrice from "@/lib/formatPrice";
import Link from "next/link";
import AddCart from "./AddCart";

type ProductProps = {
  product: ProductType;
};

const Product = ({ product }: ProductProps) => {
  return (
    <div className="h-96 bg-slate-800 rounded-md flex flex-col p-5">
      <div className="relative max-h-76 rounded-md flex-1">
        <Link href={`/product/${product.id}`}>
          <ProductImage product={product} fill />
        </Link>
      </div>
      <div className="flex items-center justify-between gap-4 my-4">
        <p className="w-40 truncate font-bold text-white">{product.name}</p>
        <p className="font-bold text-teal-500">{formatPrice(product.price!)}</p>
      </div>
      <div>
        <AddCart product={product} />
      </div>
    </div>
  );
};
export default Product;
