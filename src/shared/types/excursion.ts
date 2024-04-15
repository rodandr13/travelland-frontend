type Price = {
  price: number;
  title: string;
  description: string;
};

export type PricesValue = {
  prices: Price[];
  basePrice: Price[];
};

export type PricesMap = Map<string, PricesValue>;
