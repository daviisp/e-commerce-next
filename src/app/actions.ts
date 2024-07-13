"use server";

import stripe from "@/lib/stripe";
import { ProductType } from "@/types/Product";

export async function getProducts(): Promise<ProductType[]> {
  const products = await stripe.products.list();
  const formatedProducts = await Promise.all(
    products.data.map(async (product) => {
      const price = await stripe.prices.list({
        product: product.id,
      });

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.images[0],
        price: price.data[0].unit_amount,
        currency: price.data[0].currency,
      };
    })
  );
  return formatedProducts;
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
