import { useEffect, useRef } from "react";
import Poster from "./Poster.jsx";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function Detail({ label, children }) {
  if (!children) return null;
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium">{children}</dd>
    </div>
  );
}

export default function MovieModal({ movie, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; 
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      
      if (e.key === "Tab" && dialogRef.current) {
        const items = dialogRef.current.querySelectorAll(FOCUSABLE);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.(); 
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-0 sm:items-center sm:p-6"
      onMouseDown={(e) => {
        // Close only when the dark backdrop itself is clicked.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="modal-panel relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-line bg-panel shadow-2xl sm:rounded-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-lg text-white hover:bg-marquee"
        >
          ✕
        </button>

        <div className="overflow-y-auto">
         
          <div className="relative h-64 overflow-hidden bg-black sm:h-80">
            {movie.posterLarge && (
              <img
                src={movie.posterLarge}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-xl"
              />
            )}
            <Poster
              src={movie.posterLarge}
              alt={movie.name}
              fit="contain"
              className="relative h-full w-full"
            />
          </div>

          <div className="space-y-5 p-5 sm:p-8">
            <div>
              <h2 id="modal-title" className="font-display text-4xl leading-none tracking-wide sm:text-5xl">
                {movie.name}
              </h2>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-cream/90">
                <span>⭐ Rating: {movie.rating ?? "N/A"}</span>
                <span aria-hidden="true">|</span>
                <span>📅 Release: {movie.premiered ?? "TBA"}</span>
              </p>
            </div>

            {movie.genres.length > 0 && (
              <ul className="flex flex-wrap gap-2" aria-label="Genres">
                {movie.genres.map((g) => (
                  <li key={g} className="rounded-full border border-gold/50 px-3 py-1 text-xs text-gold">
                    {g}
                  </li>
                ))}
              </ul>
            )}

            <section>
              <h3 className="mb-1 text-sm font-bold text-muted">Overview</h3>
              <p className="max-w-prose leading-relaxed text-cream/90">
                {movie.summary || "No summary is available for this title."}
              </p>
            </section>

            <dl className="grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-3">
              <Detail label="Language">{movie.language}</Detail>
              <Detail label="Status">{movie.status}</Detail>
              <Detail label="Type">{movie.type}</Detail>
              <Detail label="Network">{movie.network}</Detail>
              <Detail label="Runtime">{movie.runtime ? `${movie.runtime} min` : null}</Detail>
              <Detail label="More info">
                {(movie.officialSite || movie.url) && (
                  <a
                    href={movie.officialSite || movie.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold underline underline-offset-2"
                  >
                    {movie.officialSite ? "Official site" : "TVMaze page"}
                  </a>
                )}
              </Detail>
            </dl>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="h-11 rounded-full border border-line px-6 font-bold hover:border-marquee hover:text-marquee"
              >
                ❌ Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
