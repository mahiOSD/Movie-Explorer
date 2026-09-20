import { useCallback, useEffect, useRef, useState } from "react";
import { fetchShows, searchShows } from "../api/tvmaze.js";
import useDebounce from "../hooks/useDebounce.js";
import SearchBar from "../components/SearchBar.jsx";
import MovieCard from "../components/MovieCard.jsx";
import CardSkeleton from "../components/CardSkeleton.jsx";
import MovieModal from "../components/MovieModal.jsx";

const PAGE_SIZE = 20;


const byRating = (a, b) => (b.rating ?? -1) - (a.rating ?? -1);

const gridClass =
  "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export default function Movies() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim(), 400);

  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading"); 
  const [errorMessage, setErrorMessage] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  const browseCache = useRef(null); 

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setVisibleCount(PAGE_SIZE);

    async function load() {
      try {
        let data;
        if (debouncedQuery) {
          data = await searchShows(debouncedQuery, controller.signal);
        } else {
          if (!browseCache.current) {
            const all = await fetchShows(0, controller.signal);
            browseCache.current = [...all].sort(byRating);
          }
          data = browseCache.current;
        }
        setMovies(data);
        setStatus("success");
      } catch (err) {
        if (err.name === "AbortError") return; 
        setErrorMessage(
          err instanceof TypeError
            ? "Could not reach the movie service. Check your connection."
            : err.message
        );
        setStatus("error");
      }
    }

    load();
    return () => controller.abort(); 
  }, [debouncedQuery, retryKey]);

  const closeModal = useCallback(() => setSelected(null), []);
  const openModal = useCallback((movie) => setSelected(movie), []);

  const visibleMovies = movies.slice(0, visibleCount);
  const heading = debouncedQuery ? `Results for "${debouncedQuery}"` : "Top rated shows";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <SearchBar value={query} onChange={setQuery} />

      <div className="mb-6 mt-10 flex flex-wrap items-end justify-between gap-2">
        <h1 className="font-display text-4xl tracking-wide sm:text-5xl">{heading}</h1>
        {status === "success" && (
          <p className="text-sm text-muted" aria-live="polite">
            {movies.length} {movies.length === 1 ? "title" : "titles"}
          </p>
        )}
      </div>

      {status === "loading" && (
        <div className={gridClass} role="status" aria-label="Loading movies">
          {Array.from({ length: 8 }, (_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="rounded-xl border border-marquee/50 bg-panel p-8 text-center">
          <p className="font-bold">Couldn't load movies</p>
          <p className="mt-1 text-muted">{errorMessage}</p>
          <button
            type="button"
            onClick={() => setRetryKey((k) => k + 1)}
            className="mt-5 h-11 rounded-full bg-marquee px-6 font-bold text-white"
          >
            Try again
          </button>
        </div>
      )}

      {status === "success" && movies.length === 0 && (
        <div className="rounded-xl border border-line bg-panel p-10 text-center">
          <p className="text-4xl" aria-hidden="true">🎞️</p>
          <p className="mt-3 font-bold">No titles match "{debouncedQuery}"</p>
          <p className="mt-1 text-muted">Check the spelling or try a shorter title.</p>
        </div>
      )}

      {status === "success" && movies.length > 0 && (
        <>
          <div className={gridClass}>
            {visibleMovies.map((m) => (
              <MovieCard key={m.id} movie={m} onSelect={openModal} />
            ))}
          </div>

          {visibleCount < movies.length && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="h-12 rounded-full border border-gold px-8 font-bold text-gold hover:bg-gold hover:text-ink"
              >
                Show more
              </button>
            </div>
          )}
        </>
      )}

      {selected && <MovieModal movie={selected} onClose={closeModal} />}
    </div>
  );
}
