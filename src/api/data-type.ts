export interface Data {
  type: "page";
  blocks: Block[];
}

export interface Block {
  type: string;
  templates: Path[];
  products: Product[];
}

export interface Path {
  href: string;
  type: string;
}

export interface Product {
  duration: {
    milliseconds: number;
    readable: string;
  };
  flags: string[];
  genres: string[];
  guid: string;
  parentalRating: string;
  people: {
    directors: string[];
    participants: string[];
  };
  production: {
    country: string[];
    year: number;
  };
  path: string;
  title: string;
  type: string;
}
