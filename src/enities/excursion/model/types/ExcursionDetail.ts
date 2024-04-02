export interface IMeetingPoint {
  title: string;
  description: string;
  location: Location;
}

interface Location {
  lng: number;
  lat: number;
}

export interface ScheduleItem {
  weekdays: string[];
  duration: number;
  prices: Price[];
  dates: Dates;
  startTime: string;
}

interface Dates {
  dateTo: string;
  dateFrom: string;
}

export interface Price {
  price: number;
  category: Category;
}

interface Category {
  title: string;
  description: string;
}

export interface RouteItem {
  title: string;
  description: string;
  gallery: string[];
}

interface ExcursionSubcategoryItem {
  title: string;
  icon: string;
}

interface City {
  title: string;
  country: Country;
}

interface Country {
  title: string;
}

export type ExcursionType = {
  title: string;
  included: Array<{ title: string }>;
  surcharge: Array<{ title: string }>;
  meetingPoint: IMeetingPoint;
  schedule: ScheduleItem[];
  route: RouteItem[];
  gallery: string[];
  excursionSubcategory: ExcursionSubcategoryItem[];
  _id: string;
  description: string;
  city: City;
  excursionCategory: { title: string };
};
