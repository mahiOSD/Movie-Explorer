import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/movies", label: "Movies" },
];

const linkClass = ({ isActive }) =>
  `rounded px-2 py-1 text-sm font-medium transition-colors hover:text-gold ${
    isActive ? "text-gold" : "text-cream/80"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
        aria-label="Main"
      >
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 font-display text-2xl tracking-wide"
        >
          <span aria-hidden="true">🎬</span>
          <span>
            Movie<span className="text-marquee">Explorer</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-4 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/movies"
            className="rounded-full bg-marquee px-5 py-2 text-sm font-bold text-white transition hover:brightness-110"
          >
            Browse Movies
          </Link>
        </div>

       
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-line md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true" className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={(s) => `${linkClass(s)} py-3 text-base`}
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/movies"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-marquee px-5 py-3 text-center font-bold text-white"
            >
              Browse Movies
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
