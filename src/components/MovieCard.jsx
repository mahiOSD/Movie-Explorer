import { memo } from "react";
import Poster from "./Poster.jsx";

function MovieCard({ movie, onSelect }) {
  return (
    <article className="mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-xl border border-line bg-panel transition hover:border-gold/60 sm:max-w-none">
      <Poster
        src={movie.poster}
        alt={movie.name}
        className="aspect-[2/3] w-full"
      />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 min-h-[3rem] text-lg font-bold leading-snug">
          {movie.name}
        </h3>
        <p className="flex items-center gap-3 text-sm text-muted">
          <span>⭐ {movie.rating ?? "N/A"}</span>
          <span aria-hidden="true">•</span>
          <span>📅 {movie.year ?? "TBA"}</span>
        </p>
        <button
          type="button"
          onClick={() => onSelect(movie)}
          className="mt-auto h-11 rounded-full bg-marquee font-bold text-white transition hover:brightness-110 active:scale-[0.98]"
        >
          See Details
        </button>
      </div>
    </article>
  );
}

export default memo(MovieCard);
