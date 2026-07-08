export interface Data {
  type: "page";
  blocks: Block[];
}

export interface Block {
  type: string;
  templates: Template[];
  products: Product[];
}

export interface Template {
  href: string;
  type: string;
}

export interface Imdb {
  id: string;
  rating: string;
  votes: number;
}

// The API exposes the cast either as `actors` or `participants`, so both are optional.
export interface People {
  directors?: string[];
  actors?: string[];
  participants?: string[];
}

export interface Production {
  country: string[];
  year: number;
}

export interface Duration {
  milliseconds: number;
  readable: string;
}

export interface Product {
  duration: Duration;
  flags: string[];
  genres: string[];
  guid: string;
  imdb?: Imdb;
  originalTitle?: string;
  parentalRating: string;
  people: People;
  production: Production;
  path: string;
  title: string;
  type: string;
}

/**
 * A product enriched with URLs resolved from the block templates,
 * ready to be rendered by the UI.
 */
export type Movie = Product & {
  posterUrl: string;
  linkUrl: string;
};
