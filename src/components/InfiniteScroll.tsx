"use client";

import { ProductType } from "@/types/Product";
import { useCallback, useEffect, useState } from "react";
import Product from "./Product";
import Skeleton from "./Skeleton";
import { useInView } from "react-intersection-observer";
import { getProducts } from "@/app/actions";

type InfiniteScrollProps = {
  initialsProducts: ProductType[];
};

const InfiniteScroll = ({ initialsProducts }: InfiniteScrollProps) => {
  const [products, setProducts] = useState<ProductType[]>(initialsProducts);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [ref, InView] = useInView();

  const lastProductId = products ? products[products.length - 1].id : "";

  const loadMoreProducts = useCallback(async () => {
    setIsLoading(true);
    const { formatedProducts, has_more } = await getProducts({ lastProductId });

    if (formatedProducts) {
      setProducts((prevProducts) => [...prevProducts, ...formatedProducts]);
      setHasMore(has_more);
    }

    setIsLoading(false);
  }, [lastProductId]);

  useEffect(() => {
    if (InView && hasMore && !isLoading) {
      loadMoreProducts();
    }
  }, [InView, isLoading]);

  return (
    <>
      {products.map((product) => (
        <Product product={product} />
      ))}

      {hasMore && (
        <div ref={ref}>
          <Skeleton />
        </div>
      )}
    </>
  );
};
export default InfiniteScroll;
