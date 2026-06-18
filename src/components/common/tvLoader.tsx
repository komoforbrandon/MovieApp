export default function TvLoader() {
  return (
    <div className="no-scrollbar w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-5">
        {Array.from({ length: 16 }, (_, index) => (
          <div
            key={`movie-${index}`}
            className="w-44 md:w-46 h-fit overflow-hidden rounded-sm"
          >
            <div className="h-42 animate-pulse bg-slate-200 md:h-70 dark:bg-slate-800" />
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="w-full space-y-2">
                  <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="h-7 w-14 shrink-0 animate-pulse rounded-full bg-amber-400/20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
