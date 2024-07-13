import { ProductType } from "@/types/Product";
import ProductImage from "./ProductImage";
import formatPrice from "@/lib/formatPrice";

type ProductProps = {
  product: ProductType;
};

const Product = ({ product }: ProductProps) => {
  return (
    <div className="h-96 bg-slate-800 rounded-md flex flex-col p-5">
      <div className="relative max-h-76 rounded-md flex-1">
        <ProductImage product={product} fill />
      </div>
      <div className="flex items-center justify-between gap-4 my-4">
        <p className="w-40 truncate font-bold text-white">{product.name}</p>
        <p className="font-bold text-teal-500">{formatPrice(product.price!)}</p>
      </div>
      <div>
        <button className="w-full rounded-md bg-teal-500 text-center text-white px-1 py-3">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
};
export default Product;
