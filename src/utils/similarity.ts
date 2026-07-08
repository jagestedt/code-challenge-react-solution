import { Product } from "../api/data-type";

export interface Similarity {
  label: string;
  detail: string;
}

export interface ComparisonResult {
  similarities: Similarity[];
  isSimilar: boolean;
}

/** Two movies count as similar when they share more than this many traits. */
const SIMILARITY_THRESHOLD = 2;

/** Returns the values present in both arrays (case-sensitive). */
const intersection = (a: string[] = [], b: string[] = []): string[] => {
  const inB = new Set(b);
  return a.filter((value) => inB.has(value));
};

/** Cast can be exposed either as `actors` or `participants` in the API. */
const getCast = (product: Product): string[] =>
  product.people.actors ?? product.people.participants ?? [];

/**
 * Collects the traits two movies share (genre, people, country, release era,
 * length and IMDb rating). The verdict is positive when they share more than
 * two traits.
 */
export const compareMovies = (a: Product, b: Product): ComparisonResult => {
  const similarities: Similarity[] = [];

  const sharedGenres = intersection(a.genres, b.genres);
  if (sharedGenres.length > 0) {
    similarities.push({ label: "Genre", detail: sharedGenres.join(", ") });
  }

  const sharedDirectors = intersection(a.people.directors, b.people.directors);
  if (sharedDirectors.length > 0) {
    similarities.push({ label: "Director", detail: sharedDirectors.join(", ") });
  }

  const sharedCast = intersection(getCast(a), getCast(b));
  if (sharedCast.length > 0) {
    similarities.push({ label: "Cast", detail: sharedCast.join(", ") });
  }

  const sharedCountries = intersection(a.production.country, b.production.country);
  if (sharedCountries.length > 0) {
    similarities.push({ label: "Country", detail: sharedCountries.join(", ") });
  }

  const yearDifference = Math.abs(a.production.year - b.production.year);
  if (yearDifference <= 5) {
    similarities.push({
      label: "Release year",
      detail:
        yearDifference === 0
          ? `Both from ${a.production.year}`
          : `${a.production.year} vs ${b.production.year}`,
    });
  }

  const durationDifferenceMinutes =
    Math.abs(a.duration.milliseconds - b.duration.milliseconds) / 60000;
  if (durationDifferenceMinutes <= 15) {
    similarities.push({
      label: "Duration",
      detail: `${a.duration.readable} vs ${b.duration.readable}`,
    });
  }

  if (a.imdb && b.imdb) {
    const ratingA = Number(a.imdb.rating);
    const ratingB = Number(b.imdb.rating);
    if (
      !Number.isNaN(ratingA) &&
      !Number.isNaN(ratingB) &&
      Math.abs(ratingA - ratingB) <= 1
    ) {
      similarities.push({
        label: "IMDb rating",
        detail: `${a.imdb.rating} vs ${b.imdb.rating}`,
      });
    }
  }

  return {
    similarities,
    isSimilar: similarities.length > SIMILARITY_THRESHOLD,
  };
};
