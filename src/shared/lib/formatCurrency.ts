export const formatCurrency = (
  value: number,
  locale = "ru-Ru",
  currency = "EUR"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};
