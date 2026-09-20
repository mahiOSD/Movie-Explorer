export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted sm:flex-row sm:px-6">
        <p>
          <span className="font-display text-lg tracking-wide text-cream">
            Movie<span className="text-marquee">Explorer</span>
          </span>{" "}
          &copy; {new Date().getFullYear()} MovieExplorer. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.tvmaze.com/api"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold"
          >
            Data by TVMaze
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
