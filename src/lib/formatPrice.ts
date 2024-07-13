export default function formatPrice(price?: number) {
  if (!price) {
    return "R$ 0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(price / 100);
}
