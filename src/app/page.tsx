import { ProductType } from "@/types/Product";
import getProducts from "./actions";
import Product from "@/components/Product";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-8 md:px-0">
        {products.map((product: ProductType) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
