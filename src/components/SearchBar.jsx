export default function SearchBar({ value, onChange }) {
  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="relative mx-auto w-full max-w-2xl"
    >
      <label htmlFor="movie-search" className="sr-only">
        Search movies by title
      </label>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg"
      >
        🔍
      </span>
      <input
        id="movie-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a movie..."
        autoComplete="off"
        className="h-14 w-full rounded-full border border-line bg-panel pl-12 pr-12 text-base text-cream placeholder:text-muted focus:border-gold focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:text-cream"
        >
          ✕
        </button>
      )}
    </form>
  );
}
