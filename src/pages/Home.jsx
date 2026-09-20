import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(60rem 30rem at 12% 10%, rgba(232,56,79,.35), transparent 60%)," +
          "radial-gradient(50rem 28rem at 90% 90%, rgba(244,193,82,.22), transparent 60%)," +
          "linear-gradient(180deg, #1a1030 0%, #120e1c 100%)",
      }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <h1
          id="hero-title"
          className="font-display text-6xl leading-[0.95] tracking-wide sm:text-8xl md:text-9xl"
        >
          Discover Movies
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80 sm:text-xl">
          Explore and discover your favorite movies and shows from around the
          world. Search by title, check the rating, and read the story before
          you press play.
        </p>
        <Link
          to="/movies"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-marquee px-9 py-4 text-lg font-bold text-white shadow-lg shadow-marquee/30 transition hover:brightness-110 active:scale-95"
        >
          Explore Now
        </Link>
      </div>
      <div className="filmstrip" aria-hidden="true" />
    </section>
  );
}
