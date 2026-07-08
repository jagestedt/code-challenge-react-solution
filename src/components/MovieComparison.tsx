import { useMemo } from "react";
import { Movie } from "../api/data-type";
import { compareMovies } from "../utils/similarity";
import { MovieCard } from "./MovieCard";

interface MovieComparisonProps {
  /** The movies selected from the catalogue (0, 1 or 2). */
  selected: Movie[];
  onClear: () => void;
}

/** Compares the two movies selected from the catalogue and shows the verdict. */
export const MovieComparison = ({ selected, onClear }: MovieComparisonProps) => {
  const [first, second] = selected;

  const result = useMemo(
    () => (first && second ? compareMovies(first, second) : null),
    [first, second]
  );

 

  return (
    <div className="comparison">
      <div className="comparison__layout">
        <div  className="comparison__pick">
          {first ? ( <MovieCard movie={first} />) : (
            <p className="comparison__placeholder">Pick a first movie</p>
          )}
        </div>

        <div className="comparison__center">
          {result ? (
            <>
              <p
                className={`verdict verdict--${result.isSimilar ? "yes" : "no"}`}
                role="status"
              >
                {result.isSimilar ? "Yes" : "No"}
              </p>
              <p className="verdict__note">
                {result.similarities.length}{" "}
                {result.similarities.length === 1 ? "similarity" : "similarities"}
              </p>

              <button type="button" className="comparison__clear" onClick={onClear}>
                Clear selection
              </button>

              {result.similarities.length > 0 ? (
                <dl className="similarities">
                  {result.similarities.map((item) => (
                    <div className="similarity" key={item.label}>
                      <dt className="similarity__label">{item.label}</dt>
                      <dd className="similarity__detail">{item.detail}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="similarities__empty">No shared traits found.</p>
              )}
            </>
          ) : (
            <>
              <p className="comparison__status" role="status">
                Select one more movie to compare.
              </p>
              <button type="button" className="comparison__clear" onClick={onClear}>
                Clear selection
              </button>
            </>
          )}
        </div>

        <div
          className="comparison__pick"
        >
          {second ? (
            <MovieCard movie={second} />
          ) : (
            <p className="comparison__placeholder">Pick a second movie</p>
          )}
        </div>
      </div>
    </div>
  );
};
