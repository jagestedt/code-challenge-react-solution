import { useEffect, useState } from "react";
import getPage from "../api/content";
import { Movie, Product, Template } from "../api/data-type";

const resolveTemplate = (href: string, product: Product): string =>
  href
    .replace("{path}", encodeURIComponent(product.path))
    .replace("{title}", encodeURIComponent(product.title));

const toMovie = (product: Product, templates: Template[]): Movie => {
  const imageTemplate = templates.find((template) => template.type === "image");
  const linkTemplate = templates.find((template) => template.type === product.type);

  return {
    ...product,
    posterUrl: imageTemplate ? resolveTemplate(imageTemplate.href, product) : "",
    linkUrl: linkTemplate ? resolveTemplate(linkTemplate.href, product) : "",
  };
};

export interface UseMoviesResult {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

/** Fetches the page via the content API and maps products into view-ready movies. */
export const useMovies = (): UseMoviesResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const data = await getPage();
        if (!active) return;

        const block = data.blocks[0];
        setMovies(
          block ? block.products.map((product) => toMovie(product, block.templates)) : []
        );
      } catch {
        if (active) setError("Could not load movies. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return { movies, loading, error };
};
