import "./styles.css";
import { useState } from "react";
import { Movie } from "./api/data-type";
import { useMovies } from "./hooks/useMovies";
import { MovieGrid } from "./components/MovieGrid";
import { MovieComparison } from "./components/MovieComparison";

const MAX_SELECTION = 2;

export default function App() {
  const { movies, loading, error } = useMovies();
  const [selectedGuids, setSelectedGuids] = useState<string[]>([]);

  const toggleSelection = (guid: string) => {
    setSelectedGuids((prev) => {
      if (prev.indexOf(guid) !== -1) {
        return prev.filter((value) => value !== guid);
      }
      if (prev.length < MAX_SELECTION) {
        return [...prev, guid];
      }
      // Already at the limit: drop the oldest selection, keep the newest.
      return [prev[1], guid];
    });
  };

  const clearSelection = () => setSelectedGuids([]);

  const selectedMovies = selectedGuids
    .map((guid) => movies.find((movie) => movie.guid === guid))
    .filter((movie): movie is Movie => Boolean(movie));

  return (
    <div className="App">
      <header className="App__header">
        <h1>Are these similar?</h1>
      </header>

      <main className="App__main">
        <section className="section" aria-labelledby="compare-heading">
          <h2 id="compare-heading" className="visually-hidden">
            Compare two movies
          </h2>
          <MovieComparison selected={selectedMovies} onClear={clearSelection} />
        </section>

        <section className="section" aria-labelledby="catalogue-heading">
          <h2 id="catalogue-heading" className="visually-hidden">
            Catalogue
          </h2>

          {loading && (
            <p className="status" role="status">
              Loading movies…
            </p>
          )}

          {error && (
            <p className="status status--error" role="alert">
              {error}
            </p>
          )}

          {!loading && !error && (
            <MovieGrid
              movies={movies}
              selectedGuids={selectedGuids}
              onToggle={toggleSelection}
            />
          )}
        </section>
      </main>
    </div>
  );
}
