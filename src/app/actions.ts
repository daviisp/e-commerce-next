"use server";

export default async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  return products;
}
