export interface ExcursionFilterItem {
  id: string;
  name: string;
  value: string;
  src: string;
  alt: string;
}

export interface ExcursionFilterList {
  items: ExcursionFilterItem[];
}
