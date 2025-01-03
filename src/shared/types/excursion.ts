export type Location = {
  lng: number;
  lat: number;
};

export type Dates = {
  dateTo: string;
  dateFrom: string;
};

export type Price = {
  categoryId: string;
  price: number;
  title: string;
  description: string;
  key: string;
  type: string;
  groupSize: number;
};

export type PromotionalPrice = {
  weekdays: string[];
  title: string;
  dates: Dates;
  prices: Price[];
};

export type RouteItem = {
  title: string;
  description: string;
  gallery: GalleryImage[];
  location: Location;
};

export type AdditionalTerms = string[];
export type Included = string[];
export type Surcharge = string[];
export type Weekdays = string[];
export type Duration = {
  days: number;
  hours: number;
  minutes: number;
};
export type StartTime = string[];
export type Subcategory = {
  title: string;
  icon: string;
};
export type Category = {
  _id: string;
  title: string;
  icon: string;
  key: CategoryKey;
};
export type Parameter = {
  title: string;
  value: string;
  icon: string;
};

export type GalleryImage = {
  src: string;
  lqip: string;
};

export enum CategoryKey {
  Individual = "individual",
  Group = "group",
}

export enum AgeCategory {
  Adult = "adult",
  Children = "child",
}

export type ExcursionType = {
  _id: string;
  _type: string;
  slug: string;
  title: string;
  city: string;
  country: string;
  description: string;
  weekdays: Weekdays;
  duration: Duration;
  startTime: StartTime;
  dates: Dates;
  included: Included;
  surcharge: Surcharge;
  additionalTerms: AdditionalTerms;
  startingPlace: RouteItem;
  endingPlace: RouteItem;
  basePrices: Price[];
  promotionalPrices: PromotionalPrice[] | null;
  priceCorrections: PromotionalPrice[] | null;
  route: RouteItem[];
  gallery: GalleryImage[];
  subcategory: Subcategory[];
  category: Category;
  parameters: Parameter[] | null;
};

export type ExcursionCard = Omit<
  ExcursionType,
  | "parameters"
  | "route"
  | "endingPlace"
  | "startingPlace"
  | "additionalTerms"
  | "surcharge"
  | "included"
  | "description"
>;

export type ExcursionCards = ExcursionCard[];
