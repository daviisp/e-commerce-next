import { getProduct } from "@/app/actions";
import AddCart from "@/components/AddCart";
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
      <div className="flex flex-col justify-center md:justify-normal items-center md:flex-row gap-4 md:gap-10">
        <div className="px-12 md:px-0 max-h-76 md:h-auto">
          <ProductImage product={product} />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">{product.name}</h1>
          <p className="font-bold text-teal-500 text-md md:text-xl">
            {formatPrice(product.price!)}
          </p>
          <p className="text-gray-400 max-w-72 text-justify py-3">
            {product.description}
          </p>
          <AddCart product={product} />
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsPage;
