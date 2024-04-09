interface ImageAssetReference {
  _ref: string;
  _type: "reference";
}

interface Image {
  _type: "image";
  asset: ImageAssetReference;
}

interface Title {
  value: string;
}

export interface IFilterItem {
  _id: string;
  icon: string;
  title: string;
}

export type FiltersType = IFilterItem[];
