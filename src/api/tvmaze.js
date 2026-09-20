const BASE_URL = "https://api.tvmaze.com";

/** Remove HTML tags from strings such as TVMaze summaries (no innerHTML injection). */
export function stripHtml(html = "") {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").trim();
}

/** Convert a raw TVMaze show into the flat shape the UI uses. */
function normalizeShow(show) {
  return {
    id: show.id,
    name: show.name,
    poster: show.image?.medium ?? null,
    posterLarge: show.image?.original ?? show.image?.medium ?? null,
    rating: show.rating?.average ?? null,
    premiered: show.premiered ?? null,
    year: show.premiered ? show.premiered.slice(0, 4) : null,
    genres: show.genres ?? [],
    summary: stripHtml(show.summary),
    language: show.language ?? null,
    status: show.status ?? null,
    type: show.type ?? null,
    runtime: show.runtime ?? show.averageRuntime ?? null,
    network: show.network?.name ?? show.webChannel?.name ?? null,
    officialSite: show.officialSite ?? null,
    url: show.url ?? null,
  };
}

async function request(path, signal) {
  const res = await fetch(`${BASE_URL}${path}`, { signal });
  if (!res.ok) {
    throw new Error(
      res.status === 429
        ? "Too many requests. Please wait a moment and try again."
        : `The movie service returned an error (${res.status}).`
    );
  }
  return res.json();
}

/** GET /shows?page=N  -> up to 250 shows per page */
export async function fetchShows(page = 0, signal) {
  const data = await request(`/shows?page=${page}`, signal);
  return data.map(normalizeShow);
}

/** GET /search/shows?q=query -> [{ score, show }] */
export async function searchShows(query, signal) {
  const data = await request(`/search/shows?q=${encodeURIComponent(query)}`, signal);
  return data.map((entry) => normalizeShow(entry.show));
}
