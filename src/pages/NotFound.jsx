import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-7xl">404</h1>
      <p className="mt-3 text-muted">This page isn't in the lineup.</p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-full bg-marquee px-6 py-3 font-bold text-white"
      >
        Back to home
      </Link>
    </section>
  );
}
