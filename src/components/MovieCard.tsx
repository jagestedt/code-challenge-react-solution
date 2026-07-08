import { useState } from "react";
import { Movie } from "../api/data-type";

interface MovieCardProps {
  movie: Movie;
}

/** A single movie tile with a poster (falling back to the title if it fails to load). */
export const MovieCard = ({ movie }: MovieCardProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(movie.posterUrl) && !imageFailed;

  return (
    <article className="card">
      <div className="card__poster">
        {showImage ? (
          <img
            className="card__image"
            src={movie.posterUrl}
            alt={`Poster for ${movie.title}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="card__fallback">{movie.title}</span>
        )}
      </div>
      <div className="card__body">
        <span className="card__title">{movie.title}</span>
        <p className="card__meta">
          <span>{movie.production.year}</span>
          {movie.genres.length > 0 && <span> · {movie.genres.join(", ")}</span>}
        </p>
      </div>
    </article>
  );
};
