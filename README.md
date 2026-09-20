# MovieExplorer

A responsive movie/show browser built with **React 19, React Router, Tailwind CSS v4 and Vite**, using the free [TVMaze API](https://www.tvmaze.com/api) (no API key needed).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Features
- **Home**: navbar, hero banner with CTA, footer.
- **Movies**: debounced search (`/search/shows?q=`), browse view (`/shows`), responsive grid (1 / 2 / 3 / 4 columns), "Show more" pagination.
- **Details modal**: poster banner, title, rating, release date, genres, overview, language, status, network, runtime, links. Closes with the X button, Close button, backdrop click or Esc key.
- Loading skeletons, error state with retry, empty state, image fallbacks.
- Accessible: labelled search, focus trap and focus return in modal, skip link, reduced-motion support.

## Structure
```
src/
  api/tvmaze.js        fetch + normalise API data
  hooks/useDebounce.js
  components/          Navbar, Footer, Layout, SearchBar, MovieCard, MovieModal, Poster, CardSkeleton
  pages/               Home, Movies, NotFound
```
