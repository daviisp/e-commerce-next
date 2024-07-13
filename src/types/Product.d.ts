export type ProductType = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  image: string;
  quantity?: number | 1;
  currency?: string;
};
