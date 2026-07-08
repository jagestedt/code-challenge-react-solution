import { Movie } from "../api/data-type";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  selectedGuids: string[];
  onToggle: (guid: string) => void;
}

/** Responsive grid of movie tiles. Clicking a tile (de)selects it for comparison. */
export const MovieGrid = ({ movies, selectedGuids, onToggle }: MovieGridProps) => (
  <ul className="grid" aria-label="Movie catalogue">
    {movies.map((movie) => {
      const selectionIndex = selectedGuids.indexOf(movie.guid);
      const isSelected = selectionIndex !== -1;

      return (
        <li key={movie.guid} className="grid__item">
          <div
            className={`grid__select${isSelected ? " grid__select--active" : ""}`}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            aria-label={movie.title}
            onClick={() => onToggle(movie.guid)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onToggle(movie.guid);
              }
            }}
          >
            {isSelected && (
              <span className="grid__badge" aria-hidden="true">
                {selectionIndex + 1}
              </span>
            )}
            <MovieCard movie={movie} />
          </div>
        </li>
      );
    })}
  </ul>
);
