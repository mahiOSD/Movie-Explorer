export default function CardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-line bg-panel sm:max-w-none"
    >
      <div className="skeleton aspect-[2/3] w-full" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-11 w-full rounded-full" />
      </div>
    </div>
  );
}
