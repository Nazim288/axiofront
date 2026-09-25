export const OLD_TARIFF_PRICE = 2500;

export const formatTariffPrice = (
  price: number,
  currency = "₽",
) => {
  const amount = price.toLocaleString("ru-RU");
  const symbol = currency.toUpperCase() === "RUB" ? "₽" : currency || "₽";
  return `${amount} ${symbol}`;
};
