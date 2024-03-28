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

interface FilterItem {
  _id: string;
  icon: Image;
  title: Title;
}

type Filters = FilterItem[];
