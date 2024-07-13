import { getProduct } from "@/app/actions";
import ProductImage from "@/components/ProductImage";
import formatPrice from "@/lib/formatPrice";
import { Metadata } from "next";

type ProductDetailsPage = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: ProductDetailsPage): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: `Produto - ${product.name}`,
  };
}

const ProductDetailsPage = async ({ params: { id } }: ProductDetailsPage) => {
  const product = await getProduct(id);

  return (
    <div className="container mx-auto py-20">
      <div className="flex flex-col items-center md:flex-row gap-2 md:gap-10">
        <div className="px-12 md:px-0 h-96 md:h-auto">
          <ProductImage product={product} />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">{product.name}</h1>
          <p className="font-bold text-teal-500 text-md md:text-xl">
            {formatPrice(product.price!)}
          </p>
          <p className="text-gray-400">{product.description}</p>
          <button className="bg-teal-500 text-centerr rounded-md text-white px-3.5 py-2.5 mt-3 md:mt-4">
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsPage;
