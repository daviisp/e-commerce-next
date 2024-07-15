"use server";

import stripe from "@/lib/stripe";

type GetProductsProps = {
  lastProductId?: string;
};

export async function getProducts({ lastProductId }: GetProductsProps) {
  const params = lastProductId
    ? { starting_after: lastProductId, limit: 8 }
    : { limit: 8 };

  const { data: products, has_more } = await stripe.products.list(params);

  const formatedProducts = await Promise.all(
    products.map(async (item) => {
      const price = await stripe.prices.list({
        product: item.id,
      });

      return {
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.images[0],
        price: price.data[0].unit_amount,
        currency: price.data[0].currency,
      };
    })
  );

  return { formatedProducts, has_more };
}

export async function getProduct(id: string) {
  const product = await stripe.products.retrieve(id);
  const price = await stripe.prices.list({ product: product.id });

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    image: product.images[0],
    price: price.data[0].unit_amount,
    currency: price.data[0].currency,
  };
}
