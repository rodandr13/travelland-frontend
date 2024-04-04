interface PriceCategory {
  title: string;
  description: string;
}

interface Price {
  price: number;
  category: PriceCategory;
}

interface Duration {
  hours: number;
}

interface Schedule {
  weekdays: string[];
  duration: Duration;
  prices: Price[];
}

interface Category {
  title: string;
}

interface Subcategory {
  title: string;
}

export interface IExcursionCard {
  _id: string;
  title: string;
  slug: string;
  excursionCategory: Category;
  excursionSubcategory: Subcategory[];
  gallery: string[];
  schedule: Schedule[];
}

export type ExcursionCardsType = IExcursionCard[];
