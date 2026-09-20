import { useState } from "react";


export default function Poster({ src, alt, className = "", fit = "cover" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={`No poster available for ${alt}`}
        className={`flex flex-col items-center justify-center gap-2 bg-panel text-muted ${className}`}
      >
        <span className="text-4xl" aria-hidden="true">🎞️</span>
        <span className="px-4 text-center text-sm">No poster</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${alt} poster`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
    />
  );
}
