interface Category {
  title: string;
  description: string;
}

interface Price {
  price: number;
  category: Category;
}

interface Duration {
  hours: number;
}

interface Schedule {
  weekdays: string[];
  duration: Duration;
  prices: Price[];
}

export interface IExcursionCard {
  _id: string;
  title: string;
  slug: string;
  gallery: string[];
  schedule: Schedule[];
}

export type ExcursionCardsType = IExcursionCard[];
